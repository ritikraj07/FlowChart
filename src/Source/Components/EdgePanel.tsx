import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Switch, FormControlLabel, Button, Box, Typography } from "@mui/material";
import { ReactFlowContextApi } from "../ContextApi/Index";
import { Edge } from "reactflow";



export default function EdgePanel() {
  const { id } = useParams();
  const context = useContext(ReactFlowContextApi);

  const [edge, setEdge] = useState<Edge | null>(null);
  const [label, setLabel] = useState<Edge["label"]>("");
  const [color, setColor] = useState("#000000");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (context && id) {
      const foundEdge = context.edges.find((edge) => edge.id === id);
      if (foundEdge) {
        setEdge(foundEdge);
        setLabel(foundEdge.label);
        setColor(foundEdge.style?.stroke || "#000000");
        setAnimated(foundEdge.animated || false);
      }
    }
  }, [context, id]);


  if (!id) {
    return <Box>
      <Typography sx={{textAlign:"Center", padding:"10px"}} >Please select an edge</Typography>
    </Box>
  }

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleAnimatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setAnimated(event.target.checked);
  };

  const handleSaveChanges = () => {
    if (context && edge) {
      const updatedEdge = {
        ...edge,
        label,
        animated,
        style: {
          ...edge.style,
          stroke: color,
        },
      };
      context.setEdges((prevEdges) =>
        prevEdges.map((e) => (e.id === edge.id ? updatedEdge : e))
      );
    }
  };

  if (!edge) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: "10px" }} >
      
      <TextField
        label="Label"
        value={label}
        onChange={handleLabelChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="color"
        label="Color"
        value={color}
        onChange={handleColorChange}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={animated}
            onChange={handleAnimatedChange}
            color="primary"
          />
        }
        label="Animated"
      />
      <br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        style={{ marginTop: "10px" }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

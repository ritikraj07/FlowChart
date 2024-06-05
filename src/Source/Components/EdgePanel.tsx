import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { ReactFlowContextApi } from "../ContextApi/Index";
import { Edge } from "reactflow";

export default function EdgePanel() {
  // Get the edge ID from the URL parameters
  const { id } = useParams();

  // Access the context for ReactFlow
  const context = useContext(ReactFlowContextApi);

  // State variables to manage edge properties
  const [edge, setEdge] = useState<Edge | null>(null);
  const [label, setLabel] = useState<Edge["label"]>("");
  const [color, setColor] = useState("#000000");
  const [animated, setAnimated] = useState(false);

  // Load edge details from context on component mount
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

  // Render a message if no edge is selected
  if (!id) {
    return (
      <Box>
        <Typography sx={{ textAlign: "Center", padding: "10px" }}>
          Please select an edge
        </Typography>
      </Box>
    );
  }

  // Handler for label change
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  // Handler for color change
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  // Handler for animated property change
  const handleAnimatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimated(event.target.checked);
  };

  // Handler to save changes to the edge
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

  // Render loading state if edge data is not yet loaded
  if (!edge) {
    return <div>Loading...</div>;
  }

  // Render form to edit edge properties
  return (
    <Box sx={{ padding: "10px" }}>
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
      <br />
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

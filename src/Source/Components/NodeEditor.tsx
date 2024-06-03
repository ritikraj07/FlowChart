import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Node } from "reactflow";
import { ReactFlowContextApi } from "../ContextApi/Index";

export default function NodeEditor() {
  const context = useContext(ReactFlowContextApi);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { nodes, setNodes } = context;

  const [text, setText] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const node = nodes.find((node: Node) => node.id === id);
      if (node) {
        setText(node.data.label);
      } else {
        navigate("/node-panel");
      }
    }
  }, [id, nodes, navigate]);

  const debounce = (func: Function, delay: number) => {
    let timer: number; ;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const updateNodeLabel = useCallback(
    debounce((id: string, newText: string) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: newText } }
            : node
        )
      );
    }, 500),
    [setNodes]
  );

  useEffect(() => {
    if (id && text !== undefined) {
      updateNodeLabel(id, text);
    }
  }, [id, text, updateNodeLabel]);

  if (!id) {
    return <Typography>Please select a node</Typography>;
  }

  return (
    <Box sx={{ padding: "10px 0px" }}>
      <Typography sx={{ textAlign: "center", fontWeight:"bold" }}>Message</Typography>
      <Box
        sx={{
          height: "100px",
          padding: "10px 5px",
          position: "relative",
        }}
      >
        <Typography sx={{ position: "absolute", top: "5px", left: "5px" }}>
          Text
        </Typography>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            height: "calc(100% - 20px)",
            boxSizing: "border-box", 
            marginTop: "18px",
            resize: "none",
            padding: "5px",
          }}
        />
      </Box>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Node } from "reactflow";
import { ReactFlowContextApi } from "../ContextApi/Index";

export default function NodeEditor() {
  // Access the ReactFlow context
  const context = useContext(ReactFlowContextApi);

  // If context is not yet available, display a loading message
  if (!context) {
    return <div>Loading...</div>;
  }

  // Destructure nodes and setNodes from context
  const { nodes, setNodes } = context;

  // State to manage text input
  const [text, setText] = useState("");

  // Get the ID of the node from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Navigation function
  const navigate = useNavigate();

  // Update text state when the node ID changes
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

  // Debounce function to limit the frequency of node label updates
  const debounce = (func: Function, delay: number) => {
    let timer: number;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Callback function to update node label
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

  // Update node label when ID or text changes
  useEffect(() => {
    if (id && text !== undefined) {
      updateNodeLabel(id, text);
    }
  }, [id, text, updateNodeLabel]);

  // Render a message if no node is selected
  if (!id) {
    return <Typography>Please select a node</Typography>;
  }

  // Render the node editor UI
  return (
    <Box sx={{ padding: "10px 0px" }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
        Message
      </Typography>
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

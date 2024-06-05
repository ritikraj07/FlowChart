import React from "react";
import { SquareOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function SquareIcon() {
  // Handle drag start event
  function onDragStart(
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <Box
      onDragStart={(event) => onDragStart(event, "squareNode")}
      draggable
      sx={{
        border: "1px solid #A0B0C9",
        padding: "10px 5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
        width: "100px",
        height: "60px",
        borderRadius: "10%",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      {/* Square icon */}
      <SquareOutlined />
    </Box>
  );
}

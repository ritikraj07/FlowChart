import React from "react";
import { Box, Typography } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Handle, Position } from "reactflow";

interface MessageNodeProps {
  data: {
    label: string;
  };
}

export default function MessageNode({ data }: MessageNodeProps) {
  return (
    <Box
      sx={{
        display: "inline-block",
        cursor: "grab",
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ minWidth: "150px" }}>
        {/* Label Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 5px",
            background: "rgb(179,240,226)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <MessageOutlinedIcon
              sx={{
                fontSize: "8px",
                color: "blue",
              }}
            />
            <Typography
              sx={{ padding: "0 5px", fontSize: "8px", fontWeight: "600" }}
            >
              Send Message
            </Typography>
          </Box>
          <Box>
            {/* Image */}
            <img
              width="8px"
              height="8px"
              style={{
                textAlign: "center",
                background: "white",
                padding: "1.5px",
                borderRadius: "5px",
              }}
              src="https://i.pinimg.com/564x/5a/5c/53/5a5c53a8cf5124a6681a5db0493b549a.jpg"
              alt="Attachment"
            />
          </Box>
        </Box>
        {/* Message Box */}
        <Box sx={{ padding: "10px 5px" }}>
          <Typography sx={{ fontSize: "8px", margin: "-5px 0px" }}>
            <pre>{data.label}</pre>
          </Typography>
        </Box>
      </Box>
      {/* Handle for source */}
      <Handle
        style={{ background: "red" }}
        type="source"
        position={Position.Left}
        id="b"
      />
      {/* Handle for target */}
      <Handle
        style={{ background: "green" }}
        type="target"
        position={Position.Right}
        id="a"
      />
    </Box>
  );
}

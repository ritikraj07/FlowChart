import { Box, Typography } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Handle, Position } from "reactflow";

interface SquareNodeProps {
  data: {
    label: string;
  };
}

export default function SquareNode({ data }: SquareNodeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        cursor: "grab",
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        border: "2px solid skyblue",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "50px",
        minHeight: "50px",
      }}
    >
      <Box sx={{ padding: "4px", textAlign: "justify" }}>
        <pre>
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            {data?.label}
          </Typography>
        </pre>
      </Box>

      <Handle
        id="k"
        type="source"
        style={{ background: "red" }}
        position={Position.Top}
      />
      <Handle
        style={{ background: "green" }}
        type="target"
        position={Position.Bottom}
        id="c"
      />
      <Handle
        style={{ background: "red" }}
        type="source"
        position={Position.Left}
        id="b"
      />
      <Handle
        style={{ background: "green" }}
        type="target"
        position={Position.Right}
        id="a"
      />
    </Box>
  );
}

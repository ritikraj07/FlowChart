import React, { useContext } from "react";
import { Box, Typography, Switch } from "@mui/material";
import { ReactFlowContextApi } from "../../ContextApi/Index";


export default function MiniMapSettings() {
  const context = useContext(ReactFlowContextApi);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { IsMiniMapOn, SetMiniMapOn } = context;

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetMiniMapOn(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography>Toggle MiniMap</Typography>
      <Switch
        size="small"
        color="secondary"
        checked={IsMiniMapOn}
        onChange={handleToggle}
      />
    </Box>
  );
}

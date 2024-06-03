import React, { useContext } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { ReactFlowContextApi } from "../ContextApi/Index";

export default function Settings() {
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
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={IsMiniMapOn}
            onChange={handleToggle}
            color="primary"
          />
        }
        label="Toggle MiniMap"
      />
    </Box>
  );
}

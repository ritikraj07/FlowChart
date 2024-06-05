import React, { useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { ReactFlowContextApi } from "../../ContextApi/Index";
import { BackgroundVariant } from "reactflow";

export default function BackGroundSetting() {
  // Access the context for ReactFlow
  const context = useContext(ReactFlowContextApi);

  // Display loading if context is not yet available
  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    backgroundColor,
    setBackgroundColor,
    backgroundVariant,
    setBackgroundVariant,
    bgLineWidth,
    setBgLineWidth,
    bgGap,
    setBgGap,
    bgSize,
    setBgSize,
  } = context;

  // Handle background color change
  const handleBackgroundColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundColor(event.target.value);
  };

  // Handle background variant change
  const handleBackgroundVariantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const value = event.target.value as BackgroundVariant;
    setBackgroundVariant(value);
  };

  // Handle background line width change
  const handleBgLineWidthChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    event.preventDefault();
    setBgLineWidth(newValue as number);
  };

  // Handle background gap change
  const handleBgGapChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
     setBgGap(newValue as [number, number]);
  };

  // Handle background size change
  const handleBgSizeChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
    setBgSize(newValue as number);
  };

  return (
    <Box
      sx={{ padding: "0px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}
    >
      {/* Background Color Setting */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography>Background Color</Typography>
        <TextField
          type="color"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          fullWidth
        />
      </Box>

      {/* Background Variant Setting */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography>Background Variant</Typography>
        <RadioGroup
          value={backgroundVariant}
          onChange={handleBackgroundVariantChange}
        >
          <FormControlLabel
            value={BackgroundVariant.Dots}
            control={<Radio />}
            label="Dots"
          />
          <FormControlLabel
            value={BackgroundVariant.Lines}
            control={<Radio />}
            label="Lines"
          />
          <FormControlLabel
            value={BackgroundVariant.Cross}
            control={<Radio />}
            label="Cross"
          />
        </RadioGroup>
      </Box>

      {/* Background Line Width Setting */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography>Line Width</Typography>
        <Slider
          value={bgLineWidth}
          min={0.1}
          max={5}
          step={0.1}
          onChange={handleBgLineWidthChange}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Background Gap Setting */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography>Gap</Typography>
        <Slider
          value={bgGap}
          min={1}
          max={10}
          step={1}
          onChange={handleBgGapChange}
          valueLabelDisplay="auto"
        />
      </Box>

      {/* Background Size Setting */}
      <Box sx={{ marginTop: "10px" }}>
        <Typography>Size</Typography>
        <Slider
          value={bgSize}
          min={0.1}
          max={20}
          step={0.1}
          onChange={handleBgSizeChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}

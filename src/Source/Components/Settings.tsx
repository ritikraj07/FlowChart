import { ReactNode, useContext, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ReactFlowContextApi } from "../ContextApi/Index";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import MiniMapSettings from "./Settings/MiniMap";
import BackgroundSetting from "./Settings/BackgroundSettings";

// Define props interface for MyAccordion component
type Props = {
  children: ReactNode;
  name: string;
  expanded: boolean;
  onChange: (isExpanded: boolean) => void;
};

// Custom Accordion component with a expand/collapse functionality
function MyAccordion({ children, name, expanded, onChange }: Props) {
  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => onChange(isExpanded)}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownCircleOutlined />}
        id={`${name}-header`}
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default function Settings() {
  // Get context from the ReactFlowContextApi
  const context = useContext(ReactFlowContextApi);

  // State to manage expanded accordion panel
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );

  // Handle accordion panel expansion/collapse
  const handleAccordionChange = (panel: string) => (isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  // If context is not available, display "Loading..."
  if (!context) {
    return <div>Loading...</div>;
  }

  // Render Settings component
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "85%",
        width: "95%",
        overflowY: "auto",
        position: "absolute",
        "&::-webkit-scrollbar": {
          width: "0px",
          background: "transparent",
        },
      }}
    >
      {/* MiniMap Settings Accordion */}
      <MyAccordion
        name="MiniMap Settings"
        expanded={expandedAccordion === "MiniMap Settings"}
        onChange={handleAccordionChange("MiniMap Settings")}
      >
        <MiniMapSettings />
      </MyAccordion>

      {/* Background Settings Accordion */}
      <MyAccordion
        name="Background Settings"
        expanded={expandedAccordion === "Background Settings"}
        onChange={handleAccordionChange("Background Settings")}
      >
        <BackgroundSetting />
      </MyAccordion>
    </Box>
  );
}

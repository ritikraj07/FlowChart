import React, { useContext } from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { toPng } from "html-to-image";
import { ReactFlowContextApi } from "../../ContextApi/Index";

const imageWidth = 1024;
const imageHeight = 768;

export default function SpeedDialComponent() {
  // Access the context for ReactFlow
  const context = useContext(ReactFlowContextApi);

  // Display loading if context is not yet available
  if (!context) return <p>Loading...</p>;

  const { SaveChart, ResetChart } = context;

  // Actions for the speed dial
  const actions = [
    { icon: <SaveIcon />, name: "Save" },
    { icon: <DeleteIcon />, name: "Reset" },
  ];

  // Function to handle downloading chart image
  const handleDownload = () => {
    const viewport = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;

    if (!viewport) {
      console.error("Viewport not found");
      return;
    }

    toPng(viewport, {
      backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `{x:100, y:100, zoom: 100}`,
      },
    })
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.setAttribute("download", "reactflow.png");
        a.setAttribute("href", dataUrl);
        a.setAttribute("target", "_blank");
        document.body.appendChild(a);
        console.log("Image saved as reactflow.png", a);
        a.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  // Function to handle speed dial action clicks
  const handleActionClick = (actionName: string) => {
    console.log(`${actionName} clicked`);
    if (actionName === "Save") {
      SaveChart();
    } else if (actionName === "Reset") {
      ResetChart();
    }
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleActionClick(action.name)}
        />
      ))}
    </SpeedDial>
  );
}

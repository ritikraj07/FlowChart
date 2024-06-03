import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useReactFlow, getRectOfNodes, getTransformForBounds } from "reactflow";
import { toPng } from "html-to-image";
const imageWidth = 1024;
const imageHeight = 768;

export default function SpeedDialComponent() {
   const { getNodes } = useReactFlow();
   const nodes = getNodes();
  const actions = [
    { icon: <FileDownloadIcon />, name: "Download" },
    { icon: <ShareIcon />, name: "Share" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <DeleteIcon />, name: "Delete" },
    { icon: <EditIcon />, name: "Edit" },
  ];

 

  const handleDownload = () => {
    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

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
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    })
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.setAttribute("download", "reactflow.png");
        a.setAttribute("href", dataUrl);
        a.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  const handleActionClick = (actionName: string) => {
    console.log(`${actionName} clicked`);
    if (actionName == "Download") {
      handleDownload();
    }
    // Implement specific logic for each action here
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

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
// import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { useReactFlow } from "reactflow";
import { toPng } from "html-to-image";
import { ReactFlowContextApi } from "../../ContextApi/Index";
import { useContext, } from "react";

const imageWidth = 1024;
const imageHeight = 768;

export default function SpeedDialComponent() {
  let context = useContext(ReactFlowContextApi);
  if (!context) return <p>Loading...</p>;
  let { SaveChart, ResetChart } = context;
  // const { getNodes } = useReactFlow();
  // const nodes = getNodes();
  const actions = [
    // { icon: <FileDownloadIcon />, name: "Download" },
    // { icon: <ShareIcon />, name: "Share: Feature Not Available" },
    { icon: <SaveIcon />, name: "Save" },
    // { icon: <PrintIcon />, name: "Print" },
    { icon: <DeleteIcon />, name: "Reset" },
  ];

  const handleDownload = () => {
    // const nodesBounds = getNodesBounds(nodes);
    // const transform = getViewportForBounds(
    //   nodesBounds,
    //   imageWidth,
    //   imageHeight,
    //   0.5,
    //   2
    // );

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
   

   

  const handleActionClick = (actionName: string) => {
    console.log(`${actionName} clicked`);
    if (actionName == "Download") {
      handleDownload();
    } else if (actionName == "Save") {
      SaveChart();
    }else if(actionName == "Reset"){
      ResetChart();
    }else if(actionName === "Print"){
      
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

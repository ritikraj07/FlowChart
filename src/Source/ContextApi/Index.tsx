import React, { createContext, ReactNode, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  BackgroundVariant,
} from "reactflow";


// Define the type for the context data
export type ReactFlowContextType = {
  nodes: Node[]; // Array of nodes
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>; // Function to update nodes
  onNodesChange: OnNodesChange; // Callback function for node changes
  edges: Edge[]; // Array of edges
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>; // Function to update edges
  onEdgesChange: OnEdgesChange; // Callback function for edge changes
  IsMiniMapOn: boolean; // MiniMap toggle state
  SetMiniMapOn: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle MiniMap
  nodeColor: string; // Node color
  setNodeColor: React.Dispatch<React.SetStateAction<string>>; // Function to update node color
  edgeColor: string; // Edge color
  setEdgeColor: React.Dispatch<React.SetStateAction<string>>; // Function to update edge color
  backgroundColor: string; // Background color
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>; // Function to update background color
  backgroundVariant: BackgroundVariant; // Background variant
  setBackgroundVariant: React.Dispatch<React.SetStateAction<BackgroundVariant>>; // Function to update background variant
  bgLineWidth: number; // Background line width
  setBgLineWidth: React.Dispatch<React.SetStateAction<number>>; // Function to update background line width
  bgGap: [number, number]; // Background gap
  setBgGap: React.Dispatch<React.SetStateAction<[number, number]>>; // Function to update background gap
  bgSize: number; // Background size
  setBgSize: React.Dispatch<React.SetStateAction<number>>; // Function to update background size
  fileName: string; // File name for chart
  SetFileName: React.Dispatch<React.SetStateAction<string>>; // Function to update file name
  SaveChart: () => void; // Function to save chart data
  SetFlowChart: (Index: number) => boolean; // Function to set chart data based on index
  DeleteFlowChart: (Index: number) => void; // Function to delete chart data
  ResetChart: () => void; // Function to reset chart data
};

// Create the context
export const ReactFlowContextApi = createContext<ReactFlowContextType | null>(
  null
);

// Props type for the ReactFlowContext component
type Props = {
  children: ReactNode;
};

// List of random words for generating file names
const randomWords = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "ugli",
  "violet",
  "watermelon",
  "xigua",
  "yam",
  "zucchini",
  "artichoke",
  "broccoli",
  "carrot",
  "daikon",
  "eggplant",
  "fennel",
  "garlic",
  "horseradish",
  "iceberg",
  "jalapeno",
  "kale",
  "lettuce",
  "mushroom",
  "nutmeg",
  "onion",
  "parsnip",
  "quinoa",
  "radish",
  "spinach",
  "tomato",
  "ube",
  "vanilla",
  "walnut",
  "xanthan",
  "yambean",
  "zest",
  "almond",
  "basil",
  "cumin",
  "dill",
  "escarole",
  "fava",
  "ginger",
  "hops",
  "italian",
  "jicama",
  "kohlrabi",
  "lime",
  "mustard",
  "nopales",
  "oregano",
  "pomegranate",
  "quill",
  "rosemary",
  "sage",
  "thyme",
  "umami",
  "vanillin",
  "wheat",
  "ximenia",
  "yarrow",
  "zatar",
  "apricot",
  "blueberry",
  "cantaloupe",
  "dragonfruit",
  "elderflower",
  "feijoa",
  "guava",
  "huckleberry",
  "indigo",
  "jackfruit",
  "kumquat",
  "lychee",
  "mulberry",
  "nectar",
];

// Function to get a random selection of words from the randomWords array
function getRandomWords(wordArray: string[], count: number): string[] {
  const shuffled = [...wordArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Main ReactFlowContext component
export default function ReactFlowContext({ children }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [IsMiniMapOn, SetMiniMapOn] = useState(true);
  const [nodeColor, setNodeColor] = useState("#00ff00");
  const [edgeColor, setEdgeColor] = useState("#ff0000");
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [backgroundVariant, setBackgroundVariant] = useState(
    BackgroundVariant.Dots
  );
  const [bgLineWidth, setBgLineWidth] = useState(0.5);
  const [bgGap, setBgGap] = useState<[number, number]>([4, 4]);
  const [bgSize, setBgSize] = useState(1);
  const [fileName, SetFileName] = useState(
    getRandomWords(randomWords, Math.floor(Math.random() * 3) + 2).join(" ")
  );

  const [id, setId] = useState<string>("");

  // function to save the chart data to localStorage
  function SaveChart() {
    if (nodes.length == 0) {
      alert("Nothing to save");
      return;
    }
    let flowCharData: any[] = JSON.parse(
      localStorage.getItem("flowCharData") || "[]"
    );

    flowCharData = flowCharData.filter((chart) => {
      // console.log(chart?.id, id)
      if (chart?.id !== id) {
        return chart;
      }
    });

    let chartData = {
      fileName,
      nodes,
      edges,
      IsMiniMapOn,
      nodeColor,
      edgeColor,
      backgroundColor,
      backgroundVariant,
      bgLineWidth,
      bgGap,
      bgSize,
    };
    if (id == "") {
      setId(Math.random().toString());
    }

    flowCharData.push({ ...chartData, id });
    localStorage.setItem("flowCharData", JSON.stringify(flowCharData));
  }

  // function to load the chart data from localStorage
  function SetFlowChart(Index: number): boolean {
    let FlowChartData = JSON.parse(
      localStorage.getItem("flowCharData") || "[]"
    );
    if (FlowChartData.length > Index) {
      setNodes(FlowChartData[Index].nodes);
      setEdges(FlowChartData[Index].edges);
      SetFileName(FlowChartData[Index].fileName);
      SetMiniMapOn(FlowChartData[Index].IsMiniMapOn);
      setNodeColor(FlowChartData[Index].nodeColor);
      setEdgeColor(FlowChartData[Index].edgeColor);
      setBackgroundColor(FlowChartData[Index].backgroundColor);
      setBackgroundVariant(FlowChartData[Index].backgroundVariant);
      setBgLineWidth(FlowChartData[Index].bgLineWidth);
      setBgGap(FlowChartData[Index].bgGap);
      setBgSize(FlowChartData[Index].bgSize);
      setId(FlowChartData[Index].id);
      return true;
    }
    return false;
  }

  // Function to delete a specific chart data
  function DeleteFlowChart(Index: number) {
    let flowChartData = JSON.parse(
      localStorage.getItem("flowChartData") || "[]"
    );
    flowChartData.splice(Index, 1);
    localStorage.setItem("flowChartData", JSON.stringify(flowChartData));
  }

  // Function to reset all chart data and settings
  function ResetChart() {
    setNodes([]);
    setEdges([]);
    SetFileName(
      getRandomWords(randomWords, Math.floor(Math.random() * 3) + 2).join(" ")
    );
    SetMiniMapOn(true);
    setNodeColor("#00ff00");
    setEdgeColor("#ff0000");
    setBackgroundColor("black");
    setBackgroundVariant(BackgroundVariant.Dots);
    setBgLineWidth(0.5);
    setBgGap([4, 4]);
    setBgSize(1);
    setId("");
  }

  // Return the context provider with the context values
  return (
    <ReactFlowContextApi.Provider
      value={{
        fileName,
        SetFileName,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        IsMiniMapOn,
        SetMiniMapOn,
        nodeColor,
        setNodeColor,
        edgeColor,
        setEdgeColor,
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
        SaveChart,
        SetFlowChart,
        DeleteFlowChart,
        ResetChart,
      }}
    >
      {children}
    </ReactFlowContextApi.Provider>
  );
}

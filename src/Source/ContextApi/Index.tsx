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


export type ReactFlowContextType = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
  IsMiniMapOn: boolean;
  SetMiniMapOn: React.Dispatch<React.SetStateAction<boolean>>;
  nodeColor: string;
  setNodeColor: React.Dispatch<React.SetStateAction<string>>;
  edgeColor: string;
  setEdgeColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  backgroundVariant: BackgroundVariant;
  setBackgroundVariant: React.Dispatch<React.SetStateAction<BackgroundVariant>>;
  bgLineWidth: number;
  setBgLineWidth: React.Dispatch<React.SetStateAction<number>>;
  bgGap: [number, number];
  setBgGap: React.Dispatch<React.SetStateAction<[number, number]>>;
  bgSize: number;
  setBgSize: React.Dispatch<React.SetStateAction<number>>;
  fileName: string;
  SetFileName: React.Dispatch<React.SetStateAction<string>>;
  SaveChart: () => void;
  SetFlowChart: (Index: number) => boolean;
  DeleteFlowChart: (Index: number) => void;
  ResetChart: () => void;
};

export const ReactFlowContextApi = createContext<ReactFlowContextType | null>(
  null
);

type Props = {
  children: ReactNode;
};

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

function getRandomWords(wordArray: string[], count: number): string[] {
  const shuffled = [...wordArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


export default function ReactFlowContext({ children }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [IsMiniMapOn, SetMiniMapOn] = useState(true);
  const [nodeColor, setNodeColor] = useState("#00ff00");
  const [edgeColor, setEdgeColor] = useState("#ff0000");
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [backgroundVariant, setBackgroundVariant] = useState(BackgroundVariant.Dots);
  const [bgLineWidth, setBgLineWidth] = useState(0.5);
  const [bgGap, setBgGap] = useState<[number, number]>([4, 4]);
  const [bgSize, setBgSize] = useState(1);
  const [fileName, SetFileName] = useState( getRandomWords(randomWords, Math.floor(Math.random() * 3) + 2).join(" "))
  
  const [id, setId] = useState<string>("")
  

  function SaveChart() {
    if (nodes.length == 0) {
      alert("Nothing to save")
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
  })
  
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
    setId(Math.random().toString())
    
  }

  flowCharData.push({ ...chartData, id }); 
  localStorage.setItem("flowCharData", JSON.stringify(flowCharData));
  }
  
  function SetFlowChart(Index: number): boolean {
    let FlowChartData = JSON.parse(localStorage.getItem("flowCharData") || "[]")
    if (FlowChartData.length > Index) {
      setNodes(FlowChartData[Index].nodes)
      setEdges(FlowChartData[Index].edges)
      SetFileName(FlowChartData[Index].fileName)
      SetMiniMapOn(FlowChartData[Index].IsMiniMapOn)
      setNodeColor(FlowChartData[Index].nodeColor)
      setEdgeColor(FlowChartData[Index].edgeColor)
      setBackgroundColor(FlowChartData[Index].backgroundColor)
      setBackgroundVariant(FlowChartData[Index].backgroundVariant)
      setBgLineWidth(FlowChartData[Index].bgLineWidth)
      setBgGap(FlowChartData[Index].bgGap)
      setBgSize(FlowChartData[Index].bgSize)
      setId(FlowChartData[Index].id)
      return true;
    }
    return false;
  }


  function DeleteFlowChart(Index: number) {
    let FlowChartData = JSON.parse(localStorage.getItem("flowCharData") || "[]")
    FlowChartData.splice(Index, 1)
    localStorage.setItem("flowCharData", JSON.stringify(FlowChartData))
  }

  function ResetChart() {
    setNodes([])
    setEdges([])
    SetFileName(
      getRandomWords(randomWords, Math.floor(Math.random() * 3) + 2).join(" ")
    );
    SetMiniMapOn(true)
    setNodeColor("#00ff00")
    setEdgeColor("#ff0000")
    setBackgroundColor("black")
    setBackgroundVariant(BackgroundVariant.Dots)
    setBgLineWidth(0.5)
    setBgGap([4, 4])
    setBgSize(1)
    setId("")
  }

  
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

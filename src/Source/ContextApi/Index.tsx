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

  

function SaveChart() {
  let flowCharData: any[] = JSON.parse(
    localStorage.getItem("flowCharData") || "[]"
  ); // Use an empty array as default value
  let id = Math.random().toString();
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

  flowCharData.push({ ...chartData, id }); // Push the chartData along with the id
  localStorage.setItem("flowCharData", JSON.stringify(flowCharData));
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
        SaveChart
      }}
    >
      {children}
    </ReactFlowContextApi.Provider>
  );
}

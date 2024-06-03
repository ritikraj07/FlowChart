import React, { createContext, ReactNode, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Connection,
  Edge,
  BackgroundVariant,
  Node,
  OnSelectionChangeParams,
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
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
};

export const ReactFlowContextApi = createContext<ReactFlowContextType | null>(
  null
);

type Props = {
  children: ReactNode;
};

export default function ReactFlowContext({ children }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [IsMiniMapOn, SetMiniMapOn] = useState(true);

  return (
    <ReactFlowContextApi.Provider
          value={{
              nodes, setNodes, onNodesChange, edges, setEdges,
              onEdgesChange, IsMiniMapOn, SetMiniMapOn
          }}
    >
      {children}
    </ReactFlowContextApi.Provider>
  );
}

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navbar } from "../Components";
import { Box } from "@mui/material";
import Controller from "../Components/Controller";
import { Outlet, useNavigate } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  Panel,
  Connection,
  Edge,
  Node,
  OnSelectionChangeParams,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import MessageNode from "../Components/Nodes/MessageNode";
import { ReactFlowContextApi } from "../ContextApi/Index";
import SpeedDialComponent from "../Components/SpeedDial/SpeedDail.tsx";
import SquareNode from "../Components/Nodes/SquareNode.tsx";

export default function Home() {
  const context = useContext(ReactFlowContextApi);

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    IsMiniMapOn,
    backgroundColor,
    backgroundVariant,
    bgLineWidth,
    bgGap,
    bgSize,
  } = context;

  const navigate = useNavigate();

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => {
        console.log(eds);
        return addEdge(params, eds);
      });
    },
    [setEdges]
  );

  function onDrop(event: React.DragEvent) {
    event.preventDefault();

    const reactFlowBounds = (
      event.target as HTMLDivElement
    ).getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode: Node = {
      id: Math.random().toString(),
      type,
      position,
      data: { label: `Your Text` },
    };
    setNodes((nds) => nds.concat(newNode));
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  const onSelectionChange = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      // console.log(edges);

      if (edges[0]?.id !== undefined) {
        navigate(`/edge-panel/${edges[0]?.id}`);
       }

      if (nodes[0]?.id !== undefined) {
        navigate(`/node-editor/${nodes[0]?.id}`);
      }
    },
    []
  );

  const nodeTypes = useMemo(() => ({ messageNode: MessageNode, squareNode: SquareNode }), []);

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          position: "relative",
        }}
      >
        {/* box for react flow */}
        <Box
          sx={{
            flexGrow: { xs: 1, md: 1 },
            height: { xs: "70vh", md: "90vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "70%" },
            zIndex: 1,
            position: "relative",
            margin: "auto",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            fitView
            // connectionLineType={ConnectionLineType.Bezier} 
            // snapToGrid={true}
            // snapGrid={[25, 25]}
          >
            <Background
              id="1"
              gap={bgGap}
              lineWidth={bgLineWidth}
              color={backgroundColor}
              variant={backgroundVariant}
              size={bgSize}
            />
            <Controls />
            <Panel position="top-right" children={undefined} />
            {IsMiniMapOn && (
              <MiniMap
                maskColor="rgba(0, 0, 0, 0.5)"
                nodeStrokeWidth={2}
                nodeStrokeColor="white"
                nodeColor={(node) => {
                  switch (node.type) {
                    case "input":
                      return "blue";
                    case "output":
                      return "green";
                    default:
                      return "teal";
                  }
                }}
                position="top-right"
                style={{
                  background: "#f0f0f0",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                zoomable
                pannable
              />
            )}
          </ReactFlow>
          <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <SpeedDialComponent />
          </Box>
        </Box>

        {/* box for settings node and edge */}
        <Box
          sx={{
            flexGrow: { xs: 1, md: 1 },
            height: { xs: "25vh", md: "90vh" },
            background: "white",
            width: { xs: "100%", md: "25%" },
            position: "relative",
          }}
        >
          <Controller />

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

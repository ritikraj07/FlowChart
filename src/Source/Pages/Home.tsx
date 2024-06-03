import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Navbar } from "../Components";
import { Box } from "@mui/material";
import Controller from "../Components/Controller";
import { Outlet, useNavigate } from "react-router-dom";
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
  NodeProps,
  EdgeProps,
  Node,
  OnSelectionChangeParams,
} from "reactflow";
import "reactflow/dist/style.css";
import MessageNode from "../Components/Nodes/MessageNode";
import { useDispatch, useSelector } from "react-redux";
import { addNode } from "../Redux/nodesSlice";
import { ReactFlowContextApi } from "../ContextApi/Index";



export default function Home() {
   const context = useContext(ReactFlowContextApi);

   if (!context) {
     return <div>Loading...</div>;
   }

   const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, IsMiniMapOn } =
     context;
  
  const nodesData = useSelector((state: any) => state.nodes.nodes);
  const edgesData = useSelector((state: any) => state.edges.edges);
  // const [nodes, setNodes, onNodesChange] = useNodesState<NodeProps>(nodesData);
  // const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeProps>(edgesData);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    
    // setNodes(nodesData);
    
  }, [nodesData]);

  // function upDateNodeData(id: string, data: any) {
  //   setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data } : node)));
  // }

  // useEffect(() => {
  //   console.log("43",nodes)
  // },[nodes])

  // useEffect(() => {
  //   setEdges(edgesData);
  // }, [edgesData]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => {
        console.log(eds);
      return addEdge(params, eds)
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
      data: { label: `${type} node` },
    };
    // dispatch(addNode(newNode));
    setNodes((nds) => nds.concat(newNode));
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  const onSelectionChange = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
  
      if (nodes.length === 0) return;
      navigate(`/node-editor/${nodes[0]?.id}`);

      // setSelectedNodes(nodes);
      // setSelectedEdges(edges);
    },
    []
  );

  const nodeTypes = useMemo(() => ({ messageNode: MessageNode }), []);

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
            border: "1px solid black",
            height: { xs: "70vh", md: "90vh" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "75%" },
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
          >
            <Background
              id="1"
              gap={[20, 30]}
              lineWidth={0.1}
              color="black"
              variant={BackgroundVariant.Dots}
              size={1}
            />
            {/* <Controls /> */}
            <Panel position="top-right" children={undefined} />
            {IsMiniMapOn && <MiniMap />}
          </ReactFlow>
        </Box>

        {/* box for settings node and edge */}
        <Box
          sx={{
            flexGrow: { xs: 1, md: 1 },
            border: "1px solid black",
            height: { xs: "25vh", md: "90vh" },
            background: "white",
            width: { xs: "100%", md: "25%" },
          }}
        >
          <Box>
            <Controller />
          </Box>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

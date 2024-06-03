import React, { useCallback, useMemo } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./Nodes/MessageNode";

const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: {
      label: (
        <div
          onClick={() => console.log("click")}
          contentEditable
          style={{
            width: "100%",
            border: "1px solid red",
            outline: "none",
            cursor: "pointer",
          }}
        />
      ),
    },
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    type: "textUpdater",
    data: { label: "2" },
    selectable: true,
    resizing: true,
  },
];
const initialEdges = [
  { id: "1-2", source: "1", target: "2", animated: true, label: "hello" },
  // { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function onDragStart(
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

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

    const newNode = {
      id: Math.random().toString(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  const createNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: Math.random().toString(),
        position: { x: 0, y: 0 },
        data: { label: "new" },
        type: "textUpdater",
      },
    ]);
  };

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <div style={{ width: "100%", height: "100%", background: "#f1f1f1" }}>
      <div style={{ display: "flex", padding: "10px", height: "86vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background
            id="1"
            gap={[20, 30]}
            lineWidth={0.1}
            color="black"
            variant={BackgroundVariant.Lines}
            size={1}
          />
          <Controls />
          <Panel position="top-right" children={undefined} />
          <MiniMap />
        </ReactFlow>

        <div
          style={{
            width: "19vw",
            height: "100%",
            background: "green",
            marginLeft: "5px",
          }}
        >
          <button onClick={createNode}>create</button>
          <div style={{ width: "100%", height: "90%", background: "#f1f1f1" }}>
            <div
              onDragStart={(event) => onDragStart(event, "textUpdater")}
              draggable
              style={{
                width: "100px",
                height: "40px",
                background: "red",
                cursor: "grab",
              }}
            >
              Drag me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node } from "reactflow";

interface NodesState {
  nodes: Node[];
}

interface NodeLabel{
  label: string,
  id: string
}

const initialState: NodesState = {
  nodes: [],
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },
    addNode(state, action: PayloadAction<Node>) {
      state.nodes.push(action.payload);
    },
    updateNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },
    updateNodesLabel(state, action: PayloadAction<NodeLabel>) {
      state.nodes = state.nodes.map((node: Node) => {
        if (node.id === action.payload.id) {
          node.data.label = action.payload.label;
        }
        return node;
      });
    },
  },
});

export const { setNodes, addNode, updateNodes, updateNodesLabel } = nodesSlice.actions;
export default nodesSlice.reducer;

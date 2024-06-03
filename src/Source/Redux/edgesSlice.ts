// features/edges/edgesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge } from "reactflow";

interface EdgesState {
  edges: Edge[];
}

const initialState: EdgesState = {
  edges: [],
};

const edgesSlice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    addEdge(state, action: PayloadAction<Edge>) {
      state.edges.push(action.payload);
    },
    updateEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
  },
});

export const { setEdges, addEdge, updateEdges } = edgesSlice.actions;
export default edgesSlice.reducer;

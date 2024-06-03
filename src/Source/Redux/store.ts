// store.ts
import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "./nodesSlice";
import edgesReducer from "./edgesSlice";

const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

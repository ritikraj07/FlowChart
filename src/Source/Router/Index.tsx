import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NodePanel from "../Components/NodePanel";
import EdgePanel from "../Components/EdgePanel";
import Settings from "../Components/Settings";
import NodeEditor from "../Components/NodeEditor";
import SelectNode from "../Components/SelectNode";

export default function Routers(): React.ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index path="" element={<NodePanel />} />
        <Route path="node-panel" element={<NodePanel />} />
        <Route path="edge-panel" element={<EdgePanel />} />
        <Route path="setting-panel" element={<Settings />} />
        <Route path="node-editor" element={<SelectNode />} />
        <Route path="node-editor/:id" element={<NodeEditor />} />
      </Route>
    </Routes>
  );
}


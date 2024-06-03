import "./App.css";
import ReactFlowContext from "./Source/ContextApi/Index";
import Routers from "./Source/Router/Index";

import { ReactFlowProvider } from "reactflow";


function App() {
  return (
    <ReactFlowContext>
      <ReactFlowProvider>
        <Routers />
      </ReactFlowProvider>
    </ReactFlowContext>
  );
}

export default App;

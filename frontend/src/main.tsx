import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DemoProvider } from "./demo/store/DemoStore";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DemoProvider>
      <App />
    </DemoProvider>
  </BrowserRouter>,
);

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DemoProvider } from "./state/DemoProvider";
import App from "./App";
import "./styles.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter><DemoProvider><App /></DemoProvider></BrowserRouter>
);

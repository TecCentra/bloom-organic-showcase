// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);
import { createRoot } from "react-dom/client";
import Clarity from "@microsoft/clarity";
import App from "./App.tsx";
import "./index.css";
import { warmServer } from "./lib/productsCache.ts";

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();
if (clarityProjectId) {
  Clarity.init(clarityProjectId);
}

warmServer();

createRoot(document.getElementById("root")!).render(<App />);
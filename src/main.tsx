// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);
import { createRoot } from "react-dom/client";
import Clarity from "@microsoft/clarity";
import App from "./App.tsx";
import "./index.css";
import { warmServer } from "./lib/productsCache.ts";

Clarity.init("zab4e1rqa4");

warmServer();

createRoot(document.getElementById("root")!).render(<App />);
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./ui/styles/tokens.css";
import "./ui/styles/layout.css";
import "./ui/styles/cards.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

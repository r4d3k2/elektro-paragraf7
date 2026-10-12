import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const koren = document.getElementById("root");
if (!koren) throw new Error("Chybí element #root");

createRoot(koren).render(
  <StrictMode>
    <App />
  </StrictMode>
);

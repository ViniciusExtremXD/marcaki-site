import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/newsreader/opsz.css";
import "./styles.css";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// O HTML de produção vem pré-renderizado (scripts/prerender.mjs); em dev o root começa vazio.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);

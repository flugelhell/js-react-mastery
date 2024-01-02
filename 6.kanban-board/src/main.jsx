import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./context/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // dicomment karena bermasalah dengna library react-beautiful-dnd
  // <React.StrictMode>
  <ContextProvider>
    <App />
  </ContextProvider>
  // </React.StrictMode>
);

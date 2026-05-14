import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import "./index.css";
import "./global.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
     <HelmetProvider>
      <App />

      <Toaster position="top-right" />
    </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
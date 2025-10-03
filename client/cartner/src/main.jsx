import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SpeedInsights } from "@vercel/speed-insights"; 
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <App />
        <SpeedInsights /> 
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>
);
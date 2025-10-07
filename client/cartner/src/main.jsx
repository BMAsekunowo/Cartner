import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react"; 
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <App />
        <Analytics />
        <SpeedInsights /> 
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>
);
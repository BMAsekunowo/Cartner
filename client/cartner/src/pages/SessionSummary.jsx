import React from "react";
import { useParams } from "react-router-dom";
import SummaryContainer from "../components/Sessions/SummaryContainer";
import "../styles/SessionSummary.css";

const SessionSummary = () => {
  const { sessionId } = useParams();

  console.log("📦 Route param sessionId:", sessionId); // Add this to confirm route is working

  return (
    <div className="cont-holder">
      <SummaryContainer sessionId={sessionId} />
    </div>
  );
};

export default SessionSummary;

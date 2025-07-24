import React from "react";
import { useParams } from "react-router-dom";
import SummaryContainer from "../components/Sessions/SummaryContainer";
import "../styles/SessionSummary.css";

const SessionSummary = () => {
  const { sessionId } = useParams();

  return (
    <div className="cont-holder">
      <SummaryContainer sessionId={sessionId} />
    </div>
  );
};

export default SessionSummary;

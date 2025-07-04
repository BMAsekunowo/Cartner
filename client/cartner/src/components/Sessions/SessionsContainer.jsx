import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../Reusables/Button";
import "../../styles/SessionsContainer.css";
import SessionTabs from "./SessionTabs";
import SessionsGrid from "./SessionGrid";

const SessionsContainer = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="session-container">
      <div className="session-content">
        <div className="title-bar">
          <h1>Sessions</h1>

          <div className="btns-wrap">
            <Button size="lg">
              <FaPlus style={{ marginRight: "6px", alignItems: "center" }} />
              New Session
            </Button>
          </div>
        </div>

        <div className="session-options">
          <SessionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="sess">
          <SessionsGrid activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default SessionsContainer;
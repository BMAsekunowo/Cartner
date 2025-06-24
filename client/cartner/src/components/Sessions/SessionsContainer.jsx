import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../Button";
import "../../styles/SessionsContainer.css";
import SessionTabs from "./SessionTabs";
import SessionsGrid from "./SessionGrid";

const SessionsContainer = () => {
  return (
    <div>
      <div className="session-container">
        <div className="session-content">
          <div className="title-bar">
            <h1>Sessions</h1>

            <div className="btn-wrap">
              <Button size="lg">
                <FaPlus style={{ marginRight: "6px", alignItems: "center" }} />
                New Session
              </Button>
            </div>
          </div>

          <div className="session-options">
            <SessionTabs />
          </div>

          <div className="sess">
            <SessionsGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsContainer;

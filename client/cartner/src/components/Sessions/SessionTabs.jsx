import React, { useState } from "react";
import SearchBar from "../Reusables/SearchBar";
import "../../styles/SessionTabs.css";

const SessionTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="session-tabs-container">
      <div className="session-tabs">
        <button
          className={activeTab === "active" ? "tab active" : "tab"}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={activeTab === "past" ? "tab active" : "tab"}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
        <button
          className={activeTab === "upcoming" ? "tab active" : "tab"}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
      </div>

      <div className="tabs-search">
        <SearchBar
          placeholder="Search for Sessions..."
          size="sm"
          buttonLabel="Find"
          onSearch={(query) => {
            console.log("Searching for:", query);
          }}
        />
      </div>
    </div>
  );
};

export default SessionTabs;

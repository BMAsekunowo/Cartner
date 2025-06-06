import React from "react";
import "../styles/BetterExperience.css";
import { FaLaptop } from "react-icons/fa"; // Font Awesome laptop icon

const BetterExperience = () => {
  return (
    <section className="better-section">
      <div className="better-content">
        <div className="better-text">
          <h2 className="headline">Easier, faster</h2>
          <p className="subtext">Faster, more engaging, and truly collaborative shopping experiences.</p>
        </div>
        <div className="better-icon">
          <FaLaptop className="laptop-icon" />
        </div>
      </div>
    </section>
  );
};

export default BetterExperience;
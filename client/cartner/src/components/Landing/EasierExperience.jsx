import React from "react";
import "../../styles/EasierExperience.css";
import { BsCheck2 } from "react-icons/bs";
import easierImage from "../../assets/landing/easier-experience.png";

function EasierExperience() {
  return (
    <>
      <div className="easier-container">
        <div className="easier-left">
          <h2 className="easier-heading">Easier Experience</h2>
          <p className="easier-text">
            We made Cartner easy to use, with zero learning curve. Just start a
            session, invite your cartners, and enjoy the journey.
          </p>
          <ul className="easier-list">
            <li>
              <BsCheck2 className="check-icon" /> Signup once, shop together
              instantly
            </li>
            <li>
              <BsCheck2 className="check-icon" /> Optimized for mobile and
              desktop
            </li>
            <li>
              <BsCheck2 className="check-icon" /> Instant sync — no delays
            </li>
            <li>
              <BsCheck2 className="check-icon" /> No limit to the number of
              sessions
            </li>
          </ul>
        </div>
        <div className="easier-right">
          <img
            src={easierImage}
            alt="Cartner Experience"
            className="easier-image"
          />
        </div>
      </div>
    </>
  );
}

export default EasierExperience;

import React from "react";
import "../../styles/HeroSection.css";
import HeroImage from "../../assets/landing/cartner-hero.png";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="session-card">
        <h1>
          Plan Smarter, Shop Better, <br />
          Together.
        </h1>
        <p>
          Explore curated collections and shop collaboratively with friends and
          or family in real time with Cartner.
        </p>

        <form className="session-form">
          <div className="form-group">
            <label htmlFor="sessionName">Session Name</label>
            <input
              type="text"
              id="sessionName"
              placeholder="e.g. Grocery Night, Tech Buy, Movie Night"
              className="form-input"
            />
          </div>

          <div className="little">
            <div className="form-group2">
              <label htmlFor="sessionType">Session Type</label>
              <select id="sessionType" className="form-input2">
                <option>Couple</option>
                <option>Friends</option>
                <option>Family</option>
                <option>Solo</option>
              </select>
            </div>

            <div className="form-group2">
              <label htmlFor="participants">Participants</label>
              <select id="participants" className="form-input2">
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="sessionPasscode">Session Passcode</label>
            <input
              type="text"
              id="sessionPasscode"
              placeholder="e.g. Grocery Night, Tech Buy"
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-btn">
            Start Session
          </button>
        </form>
      </div>

      <div className="hero-image">
        <img src={HeroImage} alt="Group shopping illustration" />
      </div>
    </div>
  );
};

export default HeroSection;

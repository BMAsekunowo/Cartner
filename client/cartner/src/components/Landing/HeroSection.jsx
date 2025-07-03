import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HeroSection.css";
import HeroImage from "../../assets/landing/cartner-hero.png";
import Button from "../Reusables/Button";
import { createSession } from "../../services/SessionService";

const HeroSection = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sessionData, setsessionData] = useState({
    sessionName: "",
    sessionType: "",
    participants: "",
    passcode: "",
  });

  const handleChange = (e) => {
    setsessionData({ ...sessionData, [e.target.name]: e.target.value });
  };

  const cleaned = {
    ...sessionData,
    sessionName: sessionData.sessionName.trim(),
    passcode: sessionData.passcode.trim(),
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const cleaned = {
      ...sessionData,
      sessionName: sessionData.sessionName.trim(),
      passcode: sessionData.passcode.trim(),
    };

    if (!token) {
      // Save session draft & redirect
      localStorage.setItem("pendingSession", JSON.stringify(cleaned));
      navigate("/login", {
        state: {
          fromSession: true,
        },
      });

      toast.warn("⚠️ Please sign in to create a session", {
        position: "top-center",
        autoClose: 7000,
        theme: "light",
      });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await createSession(cleaned);

      toast.success(
        `Congrats ${user.name}! You've Created a Session Successfully`,
        {
          position: "top-center",
          autoClose: 10000,
        }
      );

      navigate("/sessions");
    } catch (err) {
      alert(
        "Session creation failed: " + err.response?.data?.message || err.message
      );
    }
  };

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

        <form className="session-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sessionName">Session Name</label>
            <input
              type="text"
              id="sessionName"
              name="sessionName"
              placeholder="e.g. Grocery Night, Tech Buy, Movie Night"
              className="form-input"
              value={sessionData.sessionName}
              onChange={handleChange}
            />
          </div>

          <div className="little">
            <div className="form-group2">
              <label htmlFor="sessionType">Session Type</label>
              <select
                id="sessionType"
                name="sessionType"
                className="form-input2"
                value={sessionData.sessionType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select session type
                </option>
                <option value="Couple">Couple</option>
                <option value="Friends">Friends</option>
                <option value="Family">Family</option>
                <option value="Solo">Solo</option>
              </select>
            </div>

            <div className="form-group2">
              <label htmlFor="participants">Participants</label>
              <select
                id="participants"
                name="participants"
                className="form-input2"
                value={sessionData.participants}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select participants
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="passcode">Session Passcode</label>
            <input
              type="text"
              id="passcode"
              name="passcode"
              placeholder="e.g. QBQ123, MovieNight2023"
              className="form-input"
              value={sessionData.passcode}
              onChange={handleChange}
            />
          </div>
          <Button
            size="lg"
            type="submit"
            disabled={!sessionData.sessionName || !sessionData.sessionType}
          >
            Start Session
          </Button>
        </form>
      </div>

      <div className="hero-image">
        <img src={HeroImage} alt="Group shopping illustration" />
      </div>
    </div>
  );
};

export default HeroSection;

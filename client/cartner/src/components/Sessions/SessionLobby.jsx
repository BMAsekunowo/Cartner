// src/components/SessionDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSessionById } from "../../services/SessionService";
import "../../styles/SessionLobby.css";
import Button from "../Reusables/Button";

const SessionLobby = ({
    session,
}) => {

  return (
    <div className="session-lobby-wrap">
      <h1 className="sessiond-title">{session.sessionName}</h1>
      <p className="session-description">{session.sessionType}</p>

      <div className="passcode-box">
        <p className="label">Passcode</p>
        <div className="code">{session.passcode || "N/A"}</div>
      </div>

      <div className="passcode-box">
        <p className="label">Session Code</p>
        <div className="code">{session.sessionCode || "N/A"}</div>
      </div>

      <div className="participants-wrap">
        <p className="label">Participants</p>
        <div className="avatars-row">
          {session.invitedUsers.map((user, index) => (
            <div key={index} className="avatar-block">
              <img src={user.avatar} alt={user.name} className="avatar" />
              <p className="avatar-name">{user.name}</p>
              {user.role === "creator" && (
                <span className="badge">Creator</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {session.invitedUsers.some((user) => user.role === "pending") && (
        <div className="participants-wrap">
          <p className="label">Pending Participants</p>
          <div className="avatars-row">
            {session.invitedUsers
              .filter((user) => user.role === "pending")
              .map((user, index) => (
                <div key={index} className="avatar-block">
                  <img src={user.avatar} alt={user.name} className="avatar" />
                  <p className="avatar-name">{user.name}</p>
                  <span className="badge">Pending</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="budget-cart-wrap">
        <div>
          <p className="label">Budget</p>
          <p className="value">${session.budget?.toFixed(2)}</p>
        </div>
        <div>
          <p className="label">Cart Total</p>
          <p className="value">${session.cart?.totalPrice?.toFixed(2)}</p>
        </div>
        <div>
          <p className="label">Savings</p>
          <p className="value">
            $
            {((session.budget || 0) - (session.cart?.totalPrice || 0)).toFixed(
              2
            )}
          </p>
        </div>
      </div>

      <Button
        className="sessiond-action-btn"
        size="lg"
        onClick={() => navigate(`/products`)}
      >
        Add Items
      </Button>

      <footer className="session-footer">
        <Button
          className="sessiond-action-btn"
          size="lg"
          onClick={() => navigate(`/products`)}
        >
          View Session Cart
        </Button>
      </footer>
    </div>
  );
};

export default SessionLobby;

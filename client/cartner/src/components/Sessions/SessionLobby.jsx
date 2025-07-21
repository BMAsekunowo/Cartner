import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Reusables/Button";
import { useSession } from "../../context/SessionContext";
import {
  getCartBySessionId,
  leaveSession,
  endSession,
} from "../../services/SessionService";
import "../../styles/SessionLobby.css";

const SessionLobby = ({ session: propSession }) => {
  const navigate = useNavigate();
  const { activeSession, setActiveSession } = useSession();
  const session = propSession || activeSession;

  useEffect(() => {
    if (propSession) {
      setActiveSession(propSession); // Optional sync
    }
  }, [propSession]);

  if (!session) return <p>Loading session...</p>;

  const handleLeaveSession = async () => {
    try {
      await leaveSession(session._id);
      setActiveSession(null);
      navigate("/sessions");
    } catch (error) {
      console.error("Failed to leave session:", error);
    }
  };

  const handleEndSession = async () => {
    try {
      await endSession(session._id);
      setActiveSession(null);
      navigate("/sessions");
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  };

  const handleViewCart = async () => {
    try {
      const cart = await getCartBySessionId(session._id);
      navigate(`/cart/${session._id}`, { state: { cart } });
    } catch (error) {
      console.error("Failed to load session cart:", error);
    }
  };

  const CartTotal = session.cart?.totalPrice || 0;

  return (
    <div className="session-lobby-wrap">
      <div className="sessiond-header-row">
        <h1 className="sessiond-title">{session.sessionName}</h1>
        <span
          className={`status-badge ${
            session.status === "ended" ? "danger" : "success"
          }`}
        >
          {session.status === "ended" ? "Ended" : "Active"}
        </span>
      </div>

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
          <p className="value">${session.budget?.toFixed(2) || "0.00"}</p>
        </div>
        <div>
          <p className="label">Cart Total</p>
          <p className="value">
            ${session.cart?.totalPrice?.toFixed(2) || "0.00"}
          </p>
        </div>
        <div>
          <p className="label">Savings</p>
          <p className="value">
            $
            {((session.budget || 0) - (session.cart?.totalPrice || 0)).toFixed(
              2,
            )}
          </p>
        </div>
      </div>

      <div className="session-action-buttons">
        <Button
          size="md"
          variant="outline"
          onClick={() => handleLeaveSession()}
        >
          Leave Session
        </Button>

        {session.invitedUsers.some((user) => user.role === "creator") && (
          <div className="session-actions-row">
            <Button
              size="md"
              className="danger-outline"
              onClick={() => handleEndSession()}
            >
              End Session
            </Button>
          </div>
        )}
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
          onClick={() => handleViewCart()}
        >
          View Session Cart
        </Button>
      </footer>
    </div>
  );
};

export default SessionLobby;

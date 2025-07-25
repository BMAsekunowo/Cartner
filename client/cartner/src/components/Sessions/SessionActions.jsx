import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Reusables/Button";
import "../../styles/SessionActions.css";
import {
  createSession,
  joinSessionByCode,
  acceptInvite,
  rejectInvite,
  getSessionInvites,
} from "../../services/SessionService";
import { toast } from "react-toastify";
import { useSession } from "../../contexts/SessionContext";

const SessionActions = () => {
  const navigate = useNavigate();
  const { refreshSessions } = useSession();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [invites, setInvites] = useState([]);
  const [loadingInvites, setLoadingInvites] = useState(true);
  const [sessionData, setSessionData] = useState({
    sessionName: "",
    sessionType: "",
    participants: "",
    passcode: "",
  });
  const [joinData, setJoinData] = useState({
    joinSessionCode: "",
    joinPasscode: "",
  });

  const handleChange = (e) => {
    setSessionData({ ...sessionData, [e.target.name]: e.target.value });
  };

  const handleJoinChange = (e) => {
    setJoinData({ ...joinData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const cleaned = {
      ...sessionData,
      sessionName: sessionData.sessionName.trim(),
      passcode: sessionData.passcode.trim(),
      creator: user?._id,
    };

    try {
      const data = await createSession(cleaned, token);
      if (!data?.session?.id)
        throw new Error("Session creation returned no ID");

      toast.success(`Congrats ${user.name}! Session created successfully`, {
        position: "top-center",
        autoClose: 10000,
      });

      await refreshSessions(); // ✅ sync session data
      navigate(`/session/${data.session.id}`);
    } catch (err) {
      toast.error(
        `Session creation failed: ${err.response?.data?.message || err.message}`,
        { position: "top-center", autoClose: 10000 },
      );
    }
  };

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await getSessionInvites();
        setInvites(response.invites || []);
      } catch (err) {
        console.error("Error fetching invites:", err);
        toast.error("Failed to load invites", {
          position: "top-center",
          autoClose: 6000,
        });
      } finally {
        setLoadingInvites(false);
      }
    };
    fetchInvites();
  }, []);

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await joinSessionByCode(
        {
          sessionCode: joinData.joinSessionCode.trim(),
          passcode: joinData.joinPasscode.trim(),
        },
        token,
      );

      toast.success("Join request sent", {
        position: "top-center",
        autoClose: 8000,
      });

      await refreshSessions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join session", {
        position: "top-center",
        autoClose: 8000,
      });
    }
  };

  const handleAcceptInvite = async ({ sessionCode }) => {
    try {
      const res = await acceptInvite({ sessionCode });
      toast.success("Invite accepted! Redirecting...", {
        position: "top-center",
        autoClose: 6000,
      });
      await refreshSessions();
      navigate(`/session/${res.sessionId}`);
    } catch (err) {
      toast.error(
        `Failed to accept invite: ${err.response?.data?.message || err.message}`,
        {
          position: "top-center",
          autoClose: 8000,
        },
      );
    }
  };

  const handleRejectInvite = async ({ sessionCode }) => {
    try {
      await rejectInvite({ sessionCode });
      toast.info("Invite rejected", {
        position: "top-center",
        autoClose: 5000,
      });
      await refreshSessions();
    } catch (err) {
      toast.error(
        `Failed to reject invite: ${err.response?.data?.message || err.message}`,
        {
          position: "top-center",
          autoClose: 8000,
        },
      );
    }
  };

  return (
    <div className="session-actions-wrapp">
      {/* Create Session */}
      <div className="create-wrap">
        <form className="session-form" onSubmit={handleSubmit}>
          <h2>Create a New Session</h2>
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

      {/* Join Session */}
      <div className="join-form-wrap">
        <form className="session-form join-form" onSubmit={handleJoinSubmit}>
          <h2 className="form-title">Join a Session</h2>
          <div className="form-group">
            <label htmlFor="joinSessionCode">Session Code</label>
            <input
              type="text"
              id="joinSessionCode"
              name="joinSessionCode"
              placeholder="Enter session code"
              className="form-input"
              value={joinData.joinSessionCode}
              onChange={handleJoinChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="joinPasscode">Passcode</label>
            <input
              type="text"
              id="joinPasscode"
              name="joinPasscode"
              placeholder="Enter passcode"
              className="form-input"
              value={joinData.joinPasscode}
              onChange={handleJoinChange}
            />
          </div>

          <Button
            size="lg"
            type="submit"
            disabled={!joinData.joinSessionCode || !joinData.joinPasscode}
          >
            Join Session
          </Button>
        </form>
      </div>

      {/* Invitations */}
      <div className="invite-list">
        <h2 className="form-title">Invited Sessions</h2>
        {loadingInvites ? (
          <p>Loading invites...</p>
        ) : invites.length > 0 ? (
          <ul className="invite-ul">
            {invites.map((invite, index) => (
              <li key={index} className="invite-li">
                <img
                  src={`https://i.pravatar.cc/48?u=${invite.sessionCode}`}
                  alt={invite.invitedBy}
                  className="invite-avatar"
                />
                <div className="invite-info">
                  <p className="session-name">{invite.sessionName}</p>
                  <p className="invited-by">
                    Invited by: <span>{invite.invitedBy}</span>
                  </p>
                  <p className="session-code">Code: {invite.sessionCode}</p>
                </div>
                <div className="invite-actions">
                  <button
                    className="accept-btn"
                    onClick={() =>
                      handleAcceptInvite({ sessionCode: invite.sessionCode })
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() =>
                      handleRejectInvite({ sessionCode: invite.sessionCode })
                    }
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No invites yet.</p>
        )}
      </div>
    </div>
  );
};

export default SessionActions;

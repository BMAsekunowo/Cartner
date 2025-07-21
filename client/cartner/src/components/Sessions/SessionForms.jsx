import React, { useState, useEffect } from "react";
import Button from "../Reusables/Button";
import {
  getJoinRequests,
  approveJoinRequest,
  rejectJoinRequest,
} from "../../services/SessionService";
import "../../styles/SessionForms.css";

const SessionForms = ({ sessionCode, onInvite }) => {
  const [inviteData, setInviteData] = useState({
    sessionCode: "",
    emailOrUsername: "",
    role: "participant",
  });

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionCode) {
      setInviteData((prev) => ({ ...prev, sessionCode }));
      fetchJoinRequests();
    }
  }, [sessionCode]);

  const fetchJoinRequests = async () => {
    try {
      setLoading(true);
      const data = await getJoinRequests(sessionCode);
      setPendingRequests(data.requests || []);
    } catch (error) {
      console.error("Failed to load join requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInviteData({ ...inviteData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailOrUsername, role, sessionCode } = inviteData;

    if (!emailOrUsername.trim()) return;

    if (onInvite) {
      onInvite({
        identifier: emailOrUsername.trim(),
        role,
        sessionCode,
      });
    }

    setInviteData((prev) => ({
      ...prev,
      emailOrUsername: "",
    }));
  };

  const handleAccept = async (email) => {
    try {
      await approveJoinRequest(sessionCode, { email });
      fetchJoinRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (email) => {
    try {
      await rejectJoinRequest(sessionCode, { email });
      fetchJoinRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="form-section">
      <form className="invite-user-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Invite a Cartner</h3>

        <div className="form-group3">
          <label htmlFor="sessionCode">Session Code</label>
          <input
            className="invite-input"
            type="text"
            name="sessionCode"
            id="sessionCode"
            value={inviteData.sessionCode}
            onChange={handleChange}
            readOnly
            disabled
          />
        </div>

        <div className="form-group3">
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            className="invite-input"
            type="text"
            name="emailOrUsername"
            id="emailOrUsername"
            value={inviteData.emailOrUsername}
            onChange={handleChange}
            placeholder="e.g. janedoe@example.com"
            required
          />
        </div>

        <div className="form-group3">
          <label htmlFor="role">Role in Session</label>
          <select
            className="invite-input"
            name="role"
            id="role"
            value={inviteData.role}
            onChange={handleChange}
          >
            <option value="participant">Participant</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <Button size="lg" type="submit">
          Send Invite
        </Button>
      </form>

      <div className="pending-requests-section">
        <h4 className="form-title">Pending Join Requests</h4>

        {loading ? (
          <p className="form-note">Loading join requests...</p>
        ) : pendingRequests.length === 0 ? (
          <p className="form-note">No pending requests at the moment.</p>
        ) : (
          pendingRequests.map((user, index) => (
            <div className="pending-user" key={index}>
              <img
                src={user.avatar || `https://i.pravatar.cc/48?u=${user.email}`}
                alt={user.name || user.email}
                className="pending-avatar"
              />
              <div className="pending-info">
                <p className="pending-name">{user.email}</p>
              </div>
              <div className="pending-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(user.email)}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(user.email)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionForms;

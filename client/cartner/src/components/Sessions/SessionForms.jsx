import React, { useState, useEffect } from "react";
import Button from "../Reusables/Button";
import "../../styles/SessionForms.css";

const SessionForms = ({ sessionCode, onInvite }) => {
  const [inviteData, setInviteData] = useState({
    sessionCode: "",
    emailOrUsername: "",
    role: "participant",
  });

  useEffect(() => {
    // Initialize sessionCode into inviteData when prop is available
    if (sessionCode) {
      setInviteData((prev) => ({ ...prev, sessionCode }));
    }
  }, [sessionCode]);

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

  return (
    <div>
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
            readOnly // optional if you don't want it editable
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

  <div className="pending-user">
    <img src="https://i.pravatar.cc/48?u=one" alt="User One" className="pending-avatar" />
    <div className="pending-info">
      <p className="pending-name">janedoe@example.com</p>
    </div>
    <div className="pending-actions">
      <button className="accept-btn">Accept</button>
      <button className="reject-btn">Reject</button>
    </div>
  </div>

  <div className="pending-user">
    <img src="https://i.pravatar.cc/48?u=two" alt="User Two" className="pending-avatar" />
    <div className="pending-info">
      <p className="pending-name">johndoe@example.com</p>
    </div>
    <div className="pending-actions">
      <button className="accept-btn">Accept</button>
      <button className="reject-btn">Reject</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default SessionForms;
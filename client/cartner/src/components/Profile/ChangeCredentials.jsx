import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/ChangeCredentials.css";
import Button from "../Reusables/Button";
import { updateUserCredentials } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const ChangeCredentials = () => {
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editEmail && !editPassword) return;

    if (editEmail && !email.trim()) {
      toast.warning("Please enter a new email.");
      return;
    }

    if (editPassword) {
      if (!currentPassword.trim() || !newPassword.trim()) {
        toast.warning("Please enter both current and new password.");
        return;
      }
      if (newPassword.length < 6) {
        toast.warning("New password must be at least 6 characters.");
        return;
      }
    }

    const payload = {};
    if (editEmail) payload.email = email;
    if (editPassword) {
      payload.password = newPassword;
      payload.currentPassword = currentPassword;
    }

    try {
      setLoading(true);
      const res = await updateUserCredentials(payload);

      if (editPassword && res.message?.toLowerCase().includes("otp")) {
        // Password change requires OTP
        toast.success(
          "OTP sent to your email. Verify to complete password change.",
        );

        if (res.userId) {
          localStorage.setItem("userId", res.userId);
          sessionStorage.setItem("otpOrigin", "update");
          navigate("/verify-otp");
        } else {
          toast.error("Missing user ID for verification. Please try again.");
        }
      } else {
        // Email-only change or successful password change without OTP
        toast.success(res.message || "Credentials updated successfully.");
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setEditEmail(false);
        setEditPassword(false);
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.warning(
        err.response?.data?.message || err.message || "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-cred-wrap">
      <h2 className="cred-title">Change Email and/or Password</h2>
      <form onSubmit={handleSubmit} className="cred-form">
        <div className="checkbox-wrap">
          <div>
            <input
              type="checkbox"
              id="editEmail"
              checked={editEmail}
              onChange={() => setEditEmail(!editEmail)}
            />
            <label htmlFor="editEmail">Change Email</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="editPassword"
              checked={editPassword}
              onChange={() => setEditPassword(!editPassword)}
            />
            <label htmlFor="editPassword">Change Password</label>
          </div>
        </div>

        {editEmail && (
          <div className="cred-section">
            <label htmlFor="email" className="cred-label">
              New Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cred-input"
              required
            />
          </div>
        )}

        {editPassword && (
          <div className="cred-section">
            <label htmlFor="currentPassword" className="cred-label">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="cred-input"
              required
            />

            <label htmlFor="newPassword" className="cred-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="cred-input"
              required
            />
          </div>
        )}

        {(editEmail || editPassword) && (
          <div className="cred-btn-wrap">
            <Button size="lg" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangeCredentials;

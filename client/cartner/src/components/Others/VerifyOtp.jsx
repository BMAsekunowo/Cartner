import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/VerifyOtp.css";
import Logo from "../Reusables/Logo";
import { verifyOtp } from "../../services/AuthService";
import { createSession } from "../../services/SessionService";
import Button from "../Reusables/Button";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otpCode, setOtpCode] = useState("");
  const [userId] = useState(localStorage.getItem("userId") || "");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtpCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOtp({ userId, code: otpCode });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.removeItem("userId");

      const pending = localStorage.getItem("pendingSession");

      if (pending) {
        const sessionData = JSON.parse(pending);
        await createSession(sessionData);
        localStorage.removeItem("pendingSession");

        toast.success("Session created after OTP verification!", {
          position: "top-center",
        });

        navigate("/sessions");
        return;
      }

      const origin = sessionStorage.getItem("otpOrigin");

      if (origin === "register") {
        sessionStorage.removeItem("otpOrigin");
        toast.success(
          `Welcome ${response.user.name}! Your account has been verified. Start by updating your profile.`,
          { position: "top-center", autoClose: 10000 },
        );
        navigate("/editme");
      } else if (origin === "login") {
        sessionStorage.removeItem("otpOrigin");
        toast.success(
          `Welcome back ${response.user.name}! You've successfully signed in.`,
          { position: "top-center", autoClose: 10000 },
        );
        navigate("/");
      } else if (origin === "update") {
        sessionStorage.removeItem("otpOrigin");
        toast.success("Password updated successfully.", {
          position: "top-center",
        });
        navigate("/profile");
      } else {
        // fallback
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <Logo />
        <h2>Verify OTP</h2>
        <p className="otp-instruction">
          Enter the 6-digit code sent to your email address
        </p>

        <form className="otp-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={otpCode}
            onChange={handleChange}
            maxLength="6"
            className="otp-input"
            placeholder="••••••"
            required
          />
          <Button type="submit" size="lg">
            Verify and Continue
          </Button>
        </form>

        <p className="resend-note">
          Didn’t get a code? <span className="resend-text">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;

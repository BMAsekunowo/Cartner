import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import Button from "../Reusables/Button";
import SignUpImage from "../../assets/Register/signup.png";
import "../../styles/RegisterForm.css";
import Logo from "../Reusables/Logo";
import { signup } from "../../services/AuthService";

const RegisterForm = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(formData);

      // Store userId for OTP verification
      localStorage.setItem("userId", data.userId);

      // Only store user if backend includes it
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Flag this flow as coming from register
      sessionStorage.setItem("fromRegister", true);

      toast.success(
        `Hi ${formData.name}! We've sent an OTP to your email for verification.`,
        {
          position: "top-center",
          autoClose: 10000,
        },
      );

      navigate("/verify-otp");
    } catch (err) {
      toast.warning(
        `Signup failed: ${err?.response?.data?.message || err?.message || "Unknown error occurred."}`,
        {
          position: "top-center",
          autoClose: 10000,
        },
      );
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-form">
        <div className="register-title">
          <Logo />
          <div className="register-feedback-message">
            <p className="feedback-text"></p>
          </div>
        </div>

        <div className="register-form-wrap">
          <div className="register-img-wrap">
            <img src={SignUpImage} alt="Sign-Up" className="register-image" />
          </div>

          <form className="register-form-l" onSubmit={handleSubmit}>
            <div className="register-subtitle">
              <p>Welcome! Sign up to become a Cartner today</p>
            </div>

            <div className="register-input-group">
              <label htmlFor="name">Name</label>
              <div className="input-field-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                  className="form-input"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="register-input-group">
              <label htmlFor="email">Email</label>
              <div className="input-field-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className="form-input"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="register-input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                  className="form-input"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <Button size="lg" type="submit">
              Become a Cartner
            </Button>
          </form>
        </div>

        <div className="register-link">
          <p>
            Already have an account?{" "}
            <Link className="linkto" to="/login">
              Login
            </Link>
          </p>
        </div>

        <div className="register-oauth">
          <p className="oauth-text">Or sign up with: Coming Soon!</p>
          <div className="oauth-icons-row">
            <button type="button" className="oauth-icon-btn">
              <FaGoogle size={24} />
            </button>
            <button type="button" className="oauth-icon-btn">
              <FaTiktok size={24} />
            </button>
            <button type="button" className="oauth-icon-btn">
              <FaXTwitter size={24} />
            </button>
            <button type="button" className="oauth-icon-btn">
              <FaFacebookF size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import SignUpImage from "../../assets/register/signup.png";
import "../../styles/RegisterForm.css";
import Logo from "../Logo";

const RegisterForm = () => {
  return (
    <div className="register-wrapper">
      <div className="register-form">
        <div className="register-title">
          <Logo />
          <div className="register-feedback-message">
            {/* Example message: replace dynamically using state later */}
            <p className="feedback-text"></p>
          </div>
        </div>

        <div className="register-form-wrap">
          <div className="register-img-wrap">
            <img src={SignUpImage} alt="Sign-Up" className="register-image" />
          </div>

          <form className="register-form-l">
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
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Become a Cartner
            </button>
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

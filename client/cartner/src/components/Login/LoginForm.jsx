import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import Button from "../Button";
import SignInImage from "../../assets/login/signinn.jpeg";
import "../../styles/LoginForm.css";
import Logo from "../Logo";
import { login } from "../../services/AuthService"; 

const LoginForm = () => {
  const [formData, setformData] = useState({ email: "", password: ""});

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      toast.success(`Welcome Back ${data.user.name}! You've Signed In Successfully, Enjoy your journey with Cartner`,
        {
          position: "top-center", // ✅ Fixed: lowercase string or use toast.POSITION.TOP_CENTER
          autoClose: 10000,
        }
      );
      navigate("/"); // redirect to home
    } catch (err) {
      alert("Signin failed: " + err.response.data.message);
    }
  };
  return (
    <>
      <div className="login-wrapper">
        <div className="login-form">
          <div className="title">
            <Logo />

            <div className="feedback-message">
              {/* Example message: replace dynamically using state later */}
              <p className="feedback-text"></p>
            </div>
          </div>

          <div className="form-wrap">
            <div className="img-wrap">
              <img
                src={SignInImage}
                alt="Sign-In Image"
                className="signin-image"
              />
            </div>

            <form className="form-l" onSubmit={handleSubmit}>
              <div className="subtitle">
                <p>Welcome back! Sign In to Continue Your Journey</p>
              </div>
              <div className="input-group">
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
                    autoComplete="current-email"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-field-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    className="form-input"
                    name="password"
                    onChange={handleChange} 
                    value={formData.password}
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <Button
                  size="lg"
                  type="submit"
                >
                 Continue Your Journey
          </Button>
            </form>
          </div>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <Link className="linkto" to="/register">
                Become a cartner
              </Link>
            </p>
          </div>

          <div className="oauth-section">
            <p className="oauth-text">Or sign in with: Coming Soon!</p>
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
    </>
  );
};

export default LoginForm;

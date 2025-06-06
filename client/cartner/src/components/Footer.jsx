import React from "react";
import "../styles/Footer.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3><Logo /></h3>
          <p>Buy Better, Together.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Smart Splitting</a></li>
              <li><a href="#">Session Mode</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-cta">
          <h4>Become a Cartner today</h4>
          <button>Get Started</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cartner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
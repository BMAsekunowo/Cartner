import React from "react";
import "../../styles/Footer.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Logo />
            <h3>
              Plan Smarter, Shop Better,
              <br /> Together.{" "}
            </h3>
          </div>

          <div className="footer-div">
            <span>Navigation Links</span>
            <ul>
              <li className="navlinks">Explore</li>
              <li className="navlinks">How It Works</li>
              <li className="navlinks">Features</li>
              <li className="navlinks">Testimonials</li>
              <li className="navlinks">Careers</li>
              <li className="navlinks">Become a Cartner Today</li>
            </ul>
          </div>

          <div className="footer-div">
            <span>Legal & Support</span>
            <ul>
              <li className="support-links">Privacy Policy</li>
              <li className="support-links">Terms of Service</li>
              <li className="support-links">Support / Help Center</li>
              <li className="support-links"> FAQs </li>
            </ul>
          </div>

          <div className="footer-div">
            <span>Follow Us</span>
            <ul>
              <li className="social-links">Facebook</li>
              <li className="social-links">Instagram</li>
              <li className="social-links">Twitter</li>
              <li className="social-links">LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cartner. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;

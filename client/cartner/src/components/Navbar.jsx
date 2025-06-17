import React, { useState } from "react";
import Logo from "./Logo";
import "../styles/Navbar.css";
import Button from "./Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { handleLogout } from "../utils/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      <ToastContainer />
      <nav>
        <div className="nav-container">
          <div className="logo-wrap">
            <Logo />
          </div>

          <div className="nav-main">
            <ul className="nav-links">
              {isLoggedIn ? (
                <>
                  <li><Link to="/" className="linkto">Home</Link></li>
                  <li><Link to="/products" className="linkto">Explore Marketplace</Link></li>
                  <li><Link to="/sessions" className="linkto">Sessions</Link></li>
                  <li><Link to="/cart" className="linkto">My Cart</Link></li>
                  <li><Link to="/profile" className="linkto">Profile</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className="linkto">Explore</Link></li>
                  <li><Link to="/login" className="linkto">Login</Link></li>
                  <li><Link to="/register" className="linkto">Become a cartner today</Link></li>
                </>
              )}
            </ul>

            {isLoggedIn && (
              <div className="nav-logout-btn">
                <Button
                  size="sm"
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
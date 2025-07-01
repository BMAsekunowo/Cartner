import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import "../../styles/Navbar.css";
import Button from "./Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation, data } from "react-router-dom";
import { handleLogout } from "../../utils/auth";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // I'll Replace with actual authentication state management
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'))



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Authentication check (State Management)
  useEffect(() => {
    setMenuOpen(false); // Close menu on route change
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // <- Runs upon route change

  const logout = () => {
    handleLogout(navigate, "You have been logged out.");
    setIsLoggedIn(false);
    navigate("/"); //  redirect to home after logout
  };


  return (
    <div>
      <ToastContainer />
      <nav>
        <div className="nav-container">
          <div className="logo-wrap">
            <Logo />
          </div>

          <div className="hamburger-menu" onClick={toggleMenu}>
            <FaBars />
          </div>

          <div className={`nav-main ${menuOpen ? "open" : ""}`}>
            <ul className="nav-links">
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/" className="linkto">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="linkto">
                      Explore Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link to="/sessions" className="linkto">
                      Sessions
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="linkto">
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="linkto">
                      Welcome Back, {user.name}!
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className="linkto">
                      Explore
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="linkto">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="linkto">
                      Become a cartner today
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {isLoggedIn && (
              <div className="nav-logout-btn">
                <Button
                  size="sm"
                  onClick={logout}
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

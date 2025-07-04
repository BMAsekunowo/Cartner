import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { handleLogout } from "./utils/auth";
// import Navbar from "./components/Reusables/Navbar";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Sessions from "./pages/Sessions";
import Profile from "./pages/Profile";
import "./styles/index.css"; // Importing global styles
import Footer from "./components/Reusables/Footer";
import Navbar from "./components/Reusables/Navbar";
import PublicProfile from "./pages/PublicProfile"; // Importing PublicProfile page 
import ProductDetails from "./pages/ProductDetails"; // Importing ProductDetails page
import SessionDetails from "./pages/SessionDetails"; // Importing SessionDetails page
import useAutoRefreshToken from "./hooks/useAutoRefreshToken";

function App() {
  //Checking token validity
  const navigate = useNavigate();

  //Custom Hooks
  useAutoRefreshToken(); // Custom hook for auto-refreshing token
    

  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch("/api/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 401) {
        handleLogout(navigate); // Auto logout
      }
    };

    checkToken();
  }, [navigate]);

  // useEffect to fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5005/api/conhealth")
      .then((res) => console.log(res.data));
  }, []);

  return (
    <div className="outer-wrapper">
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/profile" element={<Profile />} />
          {/* Dynamic Routes */}
          <Route path="/user/:userId" element={<PublicProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/session/:sessionId" element={< SessionDetails />} />
          {/* Route for client side invalid path Error */}
          <Route path="*" element={<Error404 />} />
        </Routes>
        {/* <Home /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;

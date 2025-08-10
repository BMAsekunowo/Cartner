import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import SessionSelector from "./components/Reusables/SessionSelector";
import EditProfile from "./pages/EditProfile";
import SessionSummary from "./pages/SessionSummary"; // Importing SessionSummary page
import EditCredentials from "./pages/EditCredentials";
import Otp from "./pages/Otp"; // Importing Otp page
import CartHistoty from "./pages/CartHistory"; // Importing CartHistory page

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const port = import.meta.env.VITE_BACKEND_URL
  const PUBLIC_ROUTES = ["/", "/login", "/register", "/verify-otp"];
  //Custom Hooks
  useAutoRefreshToken(); // Custom hook for auto-refreshing token

   useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublic = PUBLIC_ROUTES.includes(pathname);
    if (!token || isPublic) return;

    const url = `${port}/api/auth/validate-token`;

    (async () => {
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) handleLogout(navigate);
      } catch (err) {
        // Don’t kick users out on network/CORS hiccups
        console.warn("Token check skipped:", err?.message || err);
      }
    })();
  }, [pathname, navigate]);

  // useEffect to fetch data from the backend
  useEffect(() => {
    axios
      .get(`${port}/api/conhealth`)
      .then((res) => console.log(res.data));
  }, []);

  const hideFooterRoutes = ["/verify-otp"];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <div className="outer-wrapper">
      <div className="app-wrapper">
        <Navbar />
        {localStorage.getItem("token") && <SessionSelector />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editme" element={<EditProfile />} />
          <Route path="/editpass" element={<EditCredentials />} />
          <Route path="/verify-otp" element={<Otp />} />
          <Route path="cart-history" element={<CartHistoty />} />
          {/* Dynamic Routes */}
          <Route path="/user/:userId" element={<PublicProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/session/:sessionId" element={<SessionDetails />} />
          <Route path="/cart/:sessionId" element={<Cart />} />
          <Route path="/cart/id/:cartId" element={<Cart />} />
          <Route
            path="/session-summary/:sessionId"
            element={<SessionSummary />}
          />
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

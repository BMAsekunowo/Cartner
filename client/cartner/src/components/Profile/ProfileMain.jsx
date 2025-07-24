import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaGlobe, FaBriefcase } from "react-icons/fa";
import { getMyProfile } from "../../services/ProfileService";
import "../../styles/ProfileMain.css";

const ProfileMain = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMyProfile(token);
        setProfile(data); // Ensure we're accessing `.profile`
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="loading">Loading profile...</div>;

  return (
    <div>
      <main className="profile-main">
        <div className="profile-header">
          <span className="name-wrap">
            <h1>Welcome Back {user.name}!</h1>
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              ☰
            </button>
            {showMenu && (
              <ul className="menu-dropdown">
                <li>Edit Profile</li>
                <li>My Orders</li>
                <li>My Sessions</li>
                <li>FAQs</li>
                <li>Contact Support</li>
                <li>Logout</li>
              </ul>
            )}
          </span>

          <p>
            Joined in {new Date(profile.joinedAt).getFullYear()}
            <span className="edit-profile">
              <Link to="/editme" className="linkto">
                Edit profile
              </Link>
            </span>
            <span className="edit-profile">
              <Link to="/editpass" className="linkto">
                Change Email and or Password
              </Link>
            </span>
          </p>
        </div>

        <div className="profile-bio">
          <div className="apos">“</div>
          <blockquote>{profile.bio || "No bio provided yet."}</blockquote>

          <ul className="profile-details">
            {profile.location && (
              <li>
                <FaMapMarkerAlt className="icon" /> Lives in {profile.location}
              </li>
            )}
            {profile.languages?.length > 0 && (
              <li>
                <FaGlobe className="icon" /> Speaks{" "}
                {profile.languages.join(", ")}
              </li>
            )}
            {profile.occupation && (
              <li>
                <FaBriefcase className="icon" /> {profile.occupation}
              </li>
            )}
          </ul>
        </div>

        <div className="cart-section">
          <h2>My Carts</h2>
          <div className="cart-scroll">
            {profile.carts?.length > 0 ? (
              profile.carts.map((cart) => (
                <div className="cart-card" key={cart._id}>
                  <h3>{cart.sessionId?.sessionName || "Untitled Cart"}</h3>
                  <p>{cart.products?.length || 0} items</p>
                  <span
                    className={`status ${cart.status?.toLowerCase() || "active"}`}
                  >
                    {cart.status || "Active"}
                  </span>
                  <span>
                    <Link
                      to={`/cart/${cart._id}`}
                      className="linkto"
                      style={{ textAlign: "right" }}
                    >
                      View More
                    </Link>
                  </span>
                </div>
              ))
            ) : (
              <p>No carts available</p>
            )}
          </div>
        </div>

        <div className="product-section">
          <h2>{user.name}’s Products</h2>
          <div className="product-cards coming-soon">
            <p>
              🔧 This feature is <strong>Coming Soon</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileMain;

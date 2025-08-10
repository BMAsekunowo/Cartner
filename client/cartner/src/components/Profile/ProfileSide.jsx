import React, { useEffect, useState } from "react";
import "../../styles/ProfileSide.css";
import { Link } from "react-router-dom";
import { getMyProfile } from "../../services/ProfileService";

const ProfileSide = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMyProfile(token);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  const port = import.meta.env.BACKEND_URL || "http://localhost:5005";

  return (
    <aside className="profile-sidebar">
      <div className="pimg-wrap">
        <img
          src={`${port}${profile.avatar}` || "/avatar.png"}
          alt="User Avatar"
          className="p-avatar"
        />
        <Link to="/products" className="linkto">
          Update Photo
        </Link>
      </div>

      <div className="verification">
        <p>{profile.sessions?.length || 0} sessions joined</p>
        <span className="verified">✔ Verified</span>
        <span className="email-add">{user.email}</span>
      </div>

      <div className="provided-info">
        <p>{user.name} provided</p>
        <ul>
          <li>Government ID</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Work email</li>
        </ul>
      </div>

      <div className="your-orders">
        <p>Your Orders</p>
        <ul className="order-list">
          <li className="order-item no-orders">
            <span>No orders yet</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ProfileSide;

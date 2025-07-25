import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Profile.css";
import { getMyProfile } from "../../services/ProfileService";

function ProfileView() {
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMyProfile(token);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      <aside className="profile-sidebar">
        <img
          src={profile.avatar ? profile.avatar : "/avatar.png"}
          alt="User Avatar"
          className="avatar"
        />
        <button className="update-photo">Update Photo</button>

        <div className="verification">
          <p>{profile.sessions?.length || 0} sessions joined</p>
          <span className="verified">✔ Verified</span>
        </div>

        <div className="provided-info">
          <p>{user.name} provided:</p>
          <ul>
            <li>Government ID</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Work email</li>
          </ul>
        </div>
      </aside>

      <main className="profile-main">
        <div className="profile-header">
          <h1>Hi, I’m {user.name}</h1>
          <p>
            Joined in {new Date(profile.joinedAt).getFullYear()}
            <span className="edit-profile">
              <Link to="/editme" className="linkto">
                Edit profile
              </Link>
            </span>
          </p>
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
        </div>

        <div className="profile-bio">
          <blockquote>{profile.bio || "No bio added yet."}</blockquote>

          <ul className="profile-details">
            {profile.location && <li>📍 Lives in {profile.location}</li>}
            {profile.languages?.length > 0 && (
              <li>🗣 Speaks {profile.languages.join(", ")}</li>
            )}
            {profile.occupation && <li>💼 Work: {profile.occupation}</li>}
          </ul>
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
}

export default ProfileView;

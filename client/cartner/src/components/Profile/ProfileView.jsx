import React, { useState } from 'react';
import '../../styles/Profile.css';

function ProfileView() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="profile-wrapper">
      <aside className="profile-sidebar">
        <img src="/avatar.png" alt="User Avatar" className="avatar" />
        <button className="update-photo">Update Photo</button>

        <div className="verification">
          <p>148 sessions joined</p>
          <span className="verified">✔ Verified</span>
        </div>

        <div className="provided-info">
          <p>Boluwatife provided:</p>
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
          <h1>Hi, I’m Boluwatife</h1>
          <p>Joined in 2024 <span className="edit-profile">• Edit profile</span></p>
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
          <blockquote>
            I'm a passionate tech-savvy guy building Cartner to make shopping more collaborative. I love working across finance and tech, and this platform reflects that.
          </blockquote>

          <ul className="profile-details">
            <li>📍 Lives in Welland, Canada</li>
            <li>🗣 Speaks English, Yoruba</li>
            <li>💼 Work: Freelance Web Developer</li>
          </ul>
        </div>

        <div className="product-section">
          <h2>Boluwatife’s Products</h2>
          <div className="product-cards coming-soon">
            <p>🔧 This feature is <strong>Coming Soon</strong></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileView;
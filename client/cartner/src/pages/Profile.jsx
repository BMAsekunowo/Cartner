import React from "react";
import ProfileView from "../components/Profile/ProfileView";
import ProfileSide from "../components/Profile/ProfileSide";
import ProfileMain from "../components/Profile/ProfileMain";

const Profile = () => {
  return (
    <div className="profile-page-wrap">
      <ProfileSide />
      <ProfileMain />
    </div>
  );
};

export default Profile;

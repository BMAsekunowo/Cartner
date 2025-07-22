import React, { useEffect } from "react";
import ProfileView from "../components/Profile/ProfileView";
import ProfileSide from "../components/Profile/ProfileSide";
import ProfileMain from "../components/Profile/ProfileMain";
import { useSession } from "../contexts/SessionContext";

const Profile = () => {
  const { refreshSessions } = useSession();

  useEffect(() => {
    refreshSessions();
  }, []);

  return (
    <div className="profile-page-wrap">
      <ProfileSide />
      <ProfileMain />
    </div>
  );
};

export default Profile;

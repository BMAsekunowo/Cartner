import { useState } from "react";
import { updateProfile as updateProfileService } from "../services/ProfileService";
import { useNavigate as navigate } from "react-router-dom";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const updated = await updateProfileService(token, profileData);
      return updated;
      navigate("/profile"); // Redirect to profile page after update
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useUpdateProfile;

import axios from "axios";

//This is the base URL for local server
const port = "http://localhost:5005";

export const getMyProfile = async (token) => {
  const res = await axios.get(`${port}/api/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProfile = async (token, profileData) => {
  const res = await axios.post(`${port}/api/profile/me`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

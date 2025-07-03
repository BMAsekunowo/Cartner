import axios from "axios";

//This is the base URL for local server
const port = "http://localhost:5005";

export const getMyProfile = async (token) => {
  const res = await axios.get(`${port}/api/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};


//use case
// useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token')
//       try {
//         const data = await getMyProfile(token)
//         setProfile(data)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchProfile()
//   }, [])

export const updateProfile = async (token, profileData) => {
  const res = await axios.post(`${port}/api/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};

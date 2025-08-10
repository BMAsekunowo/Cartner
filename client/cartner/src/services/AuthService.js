import axios from "axios";

//This is the base URL for local server
const port = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${port}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${port}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateUserCredentials = async (updateCrendentials) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await axios.patch(
    `${port}/api/auth/update-credentials`,
    updateCrendentials,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await axios.post(`${port}/api/auth/verify-otp`, otpData);
    return response.data;
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw error.response ? error.response.data : error.message;
  }
};

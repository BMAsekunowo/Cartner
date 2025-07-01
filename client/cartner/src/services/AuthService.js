import axios from "axios";

//This is the base URL for local server
const port = "http://localhost:5005";

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

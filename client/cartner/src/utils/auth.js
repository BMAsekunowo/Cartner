import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user") || "null");
// Logout utility function
export const handleLogout = (navigate) => {
  // Clear saved auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Show toast notification
  toast.error(
    `You have logged out successfully. bye for now, see you soon ${user.name}!`,
    {
      position: "top-center", // ✅ Fixed: lowercase string or use toast.POSITION.TOP_CENTER
      autoClose: 10000,
    },
  );

  // Redirect to login page
  navigate("/login");
};

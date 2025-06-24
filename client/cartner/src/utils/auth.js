import { toast } from "react-toastify";

// Logout utility function
export const handleLogout = (navigate) => {
  // Clear saved auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Show toast notification
  toast.error(
    "You have been logged out because your session expired. Please login again.",
    {
      position: "top-center", // ✅ Fixed: lowercase string or use toast.POSITION.TOP_CENTER
      autoClose: 10000,
    }
  );

  // Redirect to login page
  navigate("/login");
};
//Using this in your logout button

// import { handleLogout } from '../utils/auth';
// import { useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();

//   return (
//     <button onClick={() => handleLogout(navigate)}>
//       Logout
//     </button>
//   );
// }

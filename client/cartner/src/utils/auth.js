import { toast } from "react-toastify";

export const handleLogout = (navigate) => {
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");
  const name = savedUser?.name || "friend";

  // Clear saved auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Toast notification
  toast.success(`You’ve logged out successfully. See you soon, ${name}!`, {
    position: "top-center",
    autoClose: 5000,
  });

  // Redirect to login
  if (typeof navigate === "function") {
    navigate("/login", { replace: true });
  } else {
    window.location.href = "/login";
  }
};
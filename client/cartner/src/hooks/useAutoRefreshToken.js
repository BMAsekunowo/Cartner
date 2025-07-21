import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAutoRefreshToken = () => {
  const navigate = useNavigate();
  const activityDetected = useRef(false); // Track interaction only, not initial load

  useEffect(() => {
    let interval;

    const refreshToken = async () => {
      if (!activityDetected.current) {
        console.log("🛑 No activity since last token – skipping refresh");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          "http://localhost:5005/api/auth/refresh-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 401) {
          console.warn("⚠️ Token expired — logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          toast.error("Session expired. Please login again.", {
            position: "top-center",
            autoClose: 10000,
          });
          return;
        }

        const data = await res.json();

        if (res.ok && data.token) {
          console.log("🔄 Token refreshed due to activity");
          localStorage.setItem("token", data.token);
          activityDetected.current = false; // Reset detection after refresh
        } else {
          console.warn("  Token refresh failed:", data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (err) {
        console.error("⚠️ Refresh error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    const markActive = () => {
      activityDetected.current = true;
    };

    window.addEventListener("mousemove", markActive);
    window.addEventListener("keydown", markActive);

    interval = setInterval(refreshToken, 14 * 60 * 1000); // Every 14 minutes

    return () => {
      window.removeEventListener("mousemove", markActive);
      window.removeEventListener("keydown", markActive);
      clearInterval(interval);
    };
  }, [navigate]);
};

export default useAutoRefreshToken;

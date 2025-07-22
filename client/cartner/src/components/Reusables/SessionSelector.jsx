import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";
import { getActiveSessionsByUser } from "../../services/SessionService";
import "../../styles/SessionSelector.css";

const SessionSelector = () => {
  const { activeSession, setActiveSession } = useSession();
  const [sessions, setSessions] = useState([]);
  const [tokenPresent, setTokenPresent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setTokenPresent(false);
        return;
      }

      setTokenPresent(true);

      try {
        const data = await getActiveSessionsByUser();
        const sorted = data.sessions.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
        setSessions(sorted);

        // Auto-select newest if none selected
        if (!activeSession && sorted.length > 0) {
          setActiveSession(sorted[0]);
        }
      } catch (err) {
        console.error("🔥 Failed to fetch sessions:", err);
      }
    };

    fetchSessions();
  }, [location.pathname, activeSession]); // Refresh sessions when path or activeSession changes

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const found = sessions.find((s) => s._id === selectedId);
    setActiveSession(found);
  };

  // Hide on /cart or /profile
  const hiddenPaths = ["/cart", "/profile", "/editme", "/*"];
  if (
    !tokenPresent ||
    sessions.length === 0 ||
    hiddenPaths.includes(location.pathname)
  ) {
    return null;
  }

  const shouldHideSessionSelector = hiddenPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="session-selector-container">
      <label htmlFor="sessionSelect" className="session-label">
        You're currently shopping on:
      </label>
      <select
        id="sessionSelect"
        name="sessionSelect"
        value={activeSession?._id || ""}
        onChange={handleChange}
        className="session-select"
      >
        {sessions.map((session) => (
          <option key={session._id} value={session._id}>
            {session.sessionName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SessionSelector;

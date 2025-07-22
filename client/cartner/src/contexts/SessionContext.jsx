import React, { createContext, useContext, useState, useEffect } from "react";
import { syncUserSessions } from "../services/SessionService";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(null);
  const [syncedSessions, setSyncedSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await syncUserSessions(); // must return { sessions: [...] }

      if (!res.sessions) {
        console.warn("No synced sessions returned.");
        setSyncedSessions([]);
      } else {
        setSyncedSessions(res.sessions);
      }
    } catch (error) {
      console.error("🔁 Failed to sync sessions:", error);
    } finally {
      setLoadingSessions(false);
    }
  };

  useEffect(() => {
    fetchSessions(); // initial sync
    const interval = setInterval(fetchSessions, 5000); // live polling
    return () => clearInterval(interval);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        activeSession,
        setActiveSession,
        syncedSessions,
        loadingSessions,
        refreshSessions: fetchSessions, // ✅ this is the missing piece
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(null);

  return (
    <SessionContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

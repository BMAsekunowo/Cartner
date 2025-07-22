import React, { useEffect } from "react";
import SessionsHero from "../components/Sessions/SessionsHero";
import SessionsContainer from "../components/Sessions/SessionsContainer";
import SessionActions from "../components/Sessions/SessionActions";
import { useSession } from "../contexts/SessionContext";

const Sessions = () => {
  const { refreshSessions } = useSession();

  useEffect(() => {
    refreshSessions(); //
  }, []);

  return (
    <div>
      <SessionsHero />
      <SessionActions />
      <SessionsContainer />
    </div>
  );
};

export default Sessions;

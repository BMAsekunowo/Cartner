import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SessionLobby from '../components/Sessions/SessionLobby';  
import SessionForms from '../components/Sessions/SessionForms';
import '../styles/SessionDetails.css';
import { getSessionById } from '../services/SessionService';

const SessionDetails = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSessionById(sessionId);
        setSession(data.session);
      } catch (error) {
        console.error("Failed to load session details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <p>Loading session...</p>;

  return (
    <div className='session-details-wrap'>
      <SessionLobby session={session} />
      {session && <SessionForms sessionCode={session.sessionCode} />}
    </div>
  );
};

export default SessionDetails;
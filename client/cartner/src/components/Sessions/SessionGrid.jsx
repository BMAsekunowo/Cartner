import React from "react";
import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";
import avatar1 from "../../assets/sessions/user1.png";
import avatar2 from "../../assets/sessions/user2.png";
import avatar3 from "../../assets/sessions/user3.png";
import avatar4 from "../../assets/sessions/user4.png";
import "../../styles/SessionGrid.css";
import { getAllSessions } from "../../services/SessionService";

const SessionsGrid = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getAllSessions();
        setSessions(data.sessions);
      } catch (err) {
        console.error("Failed to load sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <p>Loading your sessions...</p>;

  return (
    <div className="session-grid-wrap">
      <p className="dotlength">You have ({sessions.length}) Active Sessions Ongoing</p>
      {sessions.map((session, index) => (
        <SessionCard
          key={index}
          title={session.sessionName}
          description={session.sessionType}
          participants={session.invitedUsers.map((user) => user.avatar || null)}
          budget={session.budget || 0}
          cartTotal={session.cart?.totalPrice || 0}
          savings={(session.budget || 0) - (session.cart?.totalPrice || 0)}
        />
      ))}
    </div>
  );
};

export default SessionsGrid;

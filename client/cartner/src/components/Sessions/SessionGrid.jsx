import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionCard from "./SessionCard";
import "../../styles/SessionGrid.css";
import { getAllSessions } from "../../services/SessionService";

const SessionsGrid = ({ activeTab }) => {
  const navigate = useNavigate();
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

  if (activeTab === "upcoming")
    return <p style={{ padding: "2rem" }}>🚧 Coming Soon!</p>;

  const filteredSessions = sessions.filter((session) => {
    if (activeTab === "active") return session.status === "active";
    if (activeTab === "past") return session.status === "ended";
  });

  return (
    <div className="session-grid-wrap">
      <p className="dotlength">
        You have ({filteredSessions.length}) {activeTab} Sessions
      </p>
      {filteredSessions.map((session, index) => (
        <SessionCard
          key={index}
          title={session.sessionName}
          description={session.sessionType}
          participants={session.invitedUsers.map((u) => u.avatar || null)}
          budget={session.budget || 0}
          cartTotal={session.cart?.totalPrice || 0}
          savings={(session.budget || 0) - (session.cart?.totalPrice || 0)}
          onView={() => navigate(`/session/${session._id}`)}
          onEdit={() => navigate(`/session/edit/${session._id}`)}
          onLeave={() => navigate(`/sessions/leave/${session._id}`)}
          onEnd={() => navigate(`/sessions/end/${session._id}`)}
        />
      ))}
    </div>
  );
};

export default SessionsGrid;

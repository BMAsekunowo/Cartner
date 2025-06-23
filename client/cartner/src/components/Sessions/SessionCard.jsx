import React from "react";
import PropTypes from "prop-types";
import "../../styles/SessionGrid.css";

const SessionCard = ({
  title,
  description,
  participants,
  budget,
  cartTotal,
  savings,
  onView,
  onEdit,
  onLeave,
}) => {
  return (
    <div className="session-card-wrap">
      <div className="session-card-header">
        <div>
          <h3 className="session-title">{title}</h3>
          <p className="session-description">{description}</p>
          <div className="participants">
            {participants.slice(0, 3).map((avatar, i) => (
              <img key={i} src={avatar} alt="avatar" className="avatar" />
            ))}
            {participants.length > 3 && (
              <span className="participant-count">+{participants.length - 3}</span>
            )}
          </div>
        </div>

        <div className="session-metrics">
          <p>
            <span>Budget:</span> ${budget}
          </p>
          <p>
            <span>Cart Total:</span> ${cartTotal}
          </p>
          <p>
            <span>Savings:</span> ${savings}
          </p>
        </div>
      </div>

      <div className="session-actions">
        <button onClick={onView}>View</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onLeave}>Leave</button>
        <button className="menu-button">⋯</button>
      </div>
    </div>
  );
};

SessionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  budget: PropTypes.number.isRequired,
  cartTotal: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onLeave: PropTypes.func,
};

export default SessionCard;
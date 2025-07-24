import React, { useEffect, useState } from "react";
import { getSessionSummary } from "../../services/SessionService";
import Button from "../Reusables/Button";
import "../../styles/SummaryContainer.css";

const SummaryContainer = ({ sessionId }) => {
  const [sessionName, setSessionName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [participantTotals, setParticipantTotals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionId) {
          console.warn("⛔ sessionId is missing in props.");
          return;
        }

        const summary = await getSessionSummary(sessionId);

        setSessionName(summary.sessionName || "Session");
        setParticipants(summary.participants || []);
        setCartItems(summary.cartItems || []);

        const totals = {};
        summary.cartItems.forEach((item) => {
          const user = item.addedBy || "Unknown";
          const total = item.product.price * item.quantity;
          totals[user] = (totals[user] || 0) + total;
        });
        setParticipantTotals(totals);
      } catch (err) {
        console.error("❌ Error fetching session summary:", err);
      }
    };

    fetchData();
  }, [sessionId]);

  return (
    <div className="sum-wrap">
      <h2 className="sum-header">Session Summary</h2>
      <div className="sum-content">
        <h3 className="sum-session">{sessionName}</h3>

        <div className="itemm-wrap">
          <h3>Items Added in Session</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Added by</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-info">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="product-img"
                      />
                      <span className="product-name">{item.product.name}</span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.addedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cost-div">
          <h3>Cost Split (Breakdown by participants)</h3>
          <p>Cost Per User</p>

          <div className="participants-hold">
            {participants.map((p, index) => {
              const cost = participantTotals[p.name] || 0;
              return (
                <div key={index} className="participant-item">
                  <span className="participant-name">{p.name}</span>
                  <span className="participant-cost">${cost.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="total-cost">
            <span>Total</span>
            <span>
              $
              {Object.values(participantTotals)
                .reduce((acc, val) => acc + val, 0)
                .toFixed(2)}
            </span>
          </div>

          <div className="btno-wrap">
            <Button className="checkout-button" size="lg" onClick={() => {}}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryContainer;

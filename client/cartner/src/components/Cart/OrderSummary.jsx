import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Reusables/Button";
import "../../styles/OrderSummary.css"; // Assuming you have a CSS file for styling

const OrderSummary = ({ subtotal = 0, sessionId }) => {
  const navigate = useNavigate();

  const feesRate = 0.01;
  const fees = subtotal * feesRate;

  const taxRate = 0.13;
  const tax = (subtotal + fees) * taxRate;

  const total = subtotal + fees + tax;

  // Function to handle checkout button click
  const handleCheckout = () => {
    if (sessionId) {
      navigate(`/session-summary/${sessionId}`);
    } else {
      alert("Session ID is missing.");
    }
  };

  return (
    <div className="order-summary-card">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-row">
        <span className="label">Subtotal</span>
        <span className="amount">${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span className="label">Fees (1%)</span>
        <span className="amount">${fees.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span className="label">Tax (13%)</span>
        <span className="amount">${tax.toFixed(2)}</span>
      </div>

      <hr className="summary-divider" />

      <div className="summary-row total-row">
        <span className="label">Total</span>
        <span className="amount">${total.toFixed(2)}</span>
      </div>

      <div className="btno-wrap">
        <Button className="checkout-button" size="lg" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;

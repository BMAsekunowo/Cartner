import React from "react";
import Button from "../Reusables/Button";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CartHeader.css";
const CartHeader = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/products");
  };

  return (
    <div className="carth-wrap">
      <div className="cart-header">
        <h1>Cart</h1>
        <p>
          <Link to="/" className="linkto">
            Home
          </Link>{" "}
          / Cart
        </p>
      </div>

      <div className="back2products">
        <Button size="md" onClick={handleContinue}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;

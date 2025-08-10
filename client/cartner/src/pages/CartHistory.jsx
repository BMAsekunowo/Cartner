import React, { useEffect, useState } from "react";
import { getUserCartHistory } from "../services/CartService";
import CartTable from "../components/Cart/CartTable";
import "../styles/CartHistory.css"; // Assuming you have a CSS file for styling

const CartHistory = () => {
  const [history, setHistory] = useState([]);
  const [expandedCartId, setExpandedCartId] = useState(null);

  const fetchCartHistory = async () => {
    try {
      const data = await getUserCartHistory();
      const sorted = [...(data.carts || [])].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setHistory(sorted);
      if (sorted.length > 0) {
        setExpandedCartId(sorted[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch cart history:", error);
    }
  };

  useEffect(() => {
    fetchCartHistory();
  }, []);

  const toggleCart = (id) => {
    setExpandedCartId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="cartp-wrap">
      <h2 className="cart-title">Cart History</h2>
      {history.length === 0 ? (
        <div className="empty-history">You have no past carts.</div>
      ) : (
        history.map((cart) => (
          <div key={cart._id} className="cart-section">
            <div
              className="cart-collapsible-header"
              onClick={() => toggleCart(cart._id)}
            >
              <div className="session-infos">
                <h2>{cart.sessionId?.sessionName || "Untitled Session"}</h2>
                <p>
                  Created:{" "}
                  {new Date(cart.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · Total Items: {cart.products?.length || 0} · Total Price: $
                  {cart.totalPrice?.toFixed(2)}
                </p>
              </div>
              <button className="toggle-btn">
                {expandedCartId === cart._id ? "−" : "+"}
              </button>
            </div>

            {expandedCartId === cart._id && (
              <div className="main-cart">
                <CartTable
                  cartId={cart._id}
                  items={cart.products || []}
                  readOnly={true}
                />
                <div className="receipt-bar">
                  <button className="download-receipt-btn" disabled>
                    Download Receipt (Coming Soon)
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CartHistory;
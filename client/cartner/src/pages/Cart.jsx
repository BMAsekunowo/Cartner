import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CartHeader from "../components/Cart/CartHeader";
import CartTable from "../components/Cart/CartTable";
import OrderSummary from "../components/Cart/OrderSummary";
import {
  getCartByUserId,
  getSingleCart,
  clearCart,
  deleteCart,
} from "../services/CartService";
import { Trash2 } from "lucide-react";
import "../styles/Cart.css";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [expandedCartId, setExpandedCartId] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const { sessionId } = useParams(); // <-- route param

  const fetchCarts = async () => {
    try {
      const data = await getCartByUserId();
      const sorted = [...(data.carts || [])].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );
      setCarts(sorted);

      // Prioritize expanding based on route sessionId
      if (sessionId) {
        const match = sorted.find((cart) => cart.sessionId?._id === sessionId);
        if (match) {
          setExpandedCartId(match._id);
        } else if (sorted.length > 0) {
          setExpandedCartId(sorted[0]._id); // fallback
        }
      } else if (sorted.length > 0) {
        setExpandedCartId(sorted[0]._id); // fallback
      }
    } catch (error) {
      console.error("  Failed to load carts:", error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [sessionId]); // listen to param change

  const toggleCart = (id) => {
    setExpandedCartId((prev) => (prev === id ? null : id));
  };

  const calculateSubtotal = (items = []) =>
    items.reduce((acc, item) => {
      const price = item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0);

  const handleDeleteCart = async (cartId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cart?",
    );
    if (!confirmDelete) return;

    try {
      await deleteCart(cartId);
      fetchCarts();
      toast.success("Cart deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete cart.");
    }
  };

  const handleClearCart = async (cartId) => {
    const confirmClear = window.confirm("Clear all products from this cart?");
    if (!confirmClear) return;

    try {
      await clearCart(cartId);
      fetchCarts();
      toast.success("Cart cleared successfully.");
    } catch (error) {
      toast.error("Failed to clear cart.");
    }
  };

  return (
    <div className="cartp-wrap">
      <CartHeader />
      {carts.length > 0 && (
        <div className="cart-count-banner">
          You have <strong>{carts.length}</strong> active{" "}
          {carts.length === 1 ? "cart" : "carts"}.
        </div>
      )}
      {carts.map((cart) => (
        <div key={cart._id} className="cart-section">
          <div className="cart-collapsible-header">
            <div onClick={() => toggleCart(cart._id)} className="session-infos">
              <h2>{cart.sessionId?.sessionName || "Untitled Session"}</h2>
              <p>
                {(() => {
                  const invited = cart.sessionId?.invitedUsers || [];
                  const creatorObj = invited.find((u) => u.role === "creator");
                  const creatorName =
                    creatorObj?.userId?._id === userId
                      ? "You"
                      : creatorObj?.userId?.name || "Unknown";
                  const participantCount =
                    1 + invited.filter((u) => u.role !== "creator").length;

                  return `Creator: ${creatorName} · Participants: ${participantCount}`;
                })()}
              </p>
            </div>

            <div className="header-actions">
              <button
                className="delete-cart-btn"
                onClick={() => handleDeleteCart(cart._id)}
              >
                <Trash2 size={18} />
              </button>
              <button
                className="toggle-btn"
                onClick={() => toggleCart(cart._id)}
              >
                {expandedCartId === cart._id ? "−" : "+"}
              </button>
              <span>
                <button
                  className="clear-cart-btn"
                  onClick={() => handleClearCart(cart._id)}
                >
                  Clear Cart
                </button>
              </span>
            </div>
          </div>

          {expandedCartId === cart._id && (
            <div className="main-cart">
              <CartTable
                cartId={cart._id}
                items={cart.products || []}
                onUpdate={fetchCarts}
              />
              <OrderSummary subtotal={calculateSubtotal(cart.products)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cart;

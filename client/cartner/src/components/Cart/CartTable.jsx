import React from "react";
import "../../styles/CartTable.css";
import { updateCartQuantity, removeProductFromCart } from "../../services/CartService";
import { FiTrash2 } from "react-icons/fi";

const CartTable = ({ items = [], cartId, onUpdate }) => {
  const handleQuantityChange = async (productId, delta) => {
    const target = items.find((i) => {
      const id = typeof i.productId === "object" ? i.productId._id : i.productId;
      return id === productId;
    });
  
    if (!target) return;
  
    const newQty = target.quantity + delta;
    if (newQty < 1) return;
  
    try {
      await updateCartQuantity(cartId, productId, delta); // <-- use delta
      onUpdate(); // Refresh from parent
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await removeProductFromCart(cartId, productId);
      onUpdate();
    } catch (err) {
      console.error("Failed to remove product:", err);
    }
  };

  const calculateTotal = () =>
    items.reduce((acc, item) => {
      const price = item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0);

  return (
    <div className="cart-table-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th className="left-align">Product</th>
            <th>Quantity</th>
            <th className="right-align">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const product = item.productId || {};
            const productId = product._id || item.productId; // supports object or string

            return (
              <tr key={productId || index}>
                <td className="product-info">
                  <div className="product-info-wrap">
                    <img
                      src={
                        product.imageUrl
                      }
                      alt={product.name || "Product"}
                      className="product-img"
                    />
                    <div className="product-text">
                      <span className="product-name">{product.name || "Unnamed Product"}</span>
                      {product.color && (
                        <span className="product-color">Color: {product.color}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(productId, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(productId, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="center-align">
                  ${(product.price * item.quantity || 0).toFixed(2)}
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveProduct(productId)}
                    title="Remove item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td className="tfoot-label">Total</td>
            <td className="tfoot-value">
              ${calculateTotal().toFixed(2)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTable;
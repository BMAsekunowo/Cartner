import React from "react";
import "../../styles/CartTable.css";

const cartItems = [
  {
    id: 1,
    name: "Basic T-Shirt",
    color: "White",
    price: 25.0,
    quantity: 1,
    image: "https://via.placeholder.com/60?text=Shirt",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    color: "Black",
    price: 99.0,
    quantity: 1,
    image: "https://via.placeholder.com/60?text=Earbuds",
  },
  {
    id: 3,
    name: "Running Shoes",
    color: "Navy",
    price: 85.0,
    quantity: 1,
    image: "https://via.placeholder.com/60?text=Shoes",
  },
];

const CartTable = () => {
  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-table-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th className="left-align">Product</th>
            <th>Quantity</th>
            <th className="right-align">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="product-info">
                  <div className="product-info-wrap">
                    <img src={item.image} alt={item.name} className="product-img" />
                    <div className="product-text">
                      <span className="product-name">{item.name}</span>
                      <span className="product-color">Color: {item.color}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="quantity-controls">
                    <button className="qty-btn">−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn">+</button>
                  </div>
                </td>
                <td className="right-align">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td ></td>
            <td className="tfoot-label">Total</td>
            <td className="right-align tfoot-value">${calculateTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTable;

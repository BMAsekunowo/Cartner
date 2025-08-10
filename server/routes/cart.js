const express = require("express"); //Express server
const router = express.Router(); //Router instance
const {
  createCart,
  getCartByUserId,
  updateCart,
  updateCartQuantity,
  removeProductFromCart,
  addProductToCart,
  getSingleCart,
  clearCart,
  deleteCart,
  getUserCartHistory,
} = require("../controllers/cartController"); //Cart Controller connection
const protect = require("../middleware/authMiddleware"); //Auth Middleware connection

// Create a new cart
router.post("/", protect, createCart);

// Get cart by user ID
router.get("/", protect, getCartByUserId);

// Get user cart history
router.get("/history", protect, getUserCartHistory);

// Update cart by cart ID
router.put("/:cartId", protect, updateCart);

// Update product quantity in cart by cart ID
router.patch("/:cartId/quantity", protect, updateCartQuantity);

// Remove product from cart by cart ID and product ID
router.delete("/:cartId/product/:productId", protect, removeProductFromCart);

// Add product to cart by cart ID
router.post("/:cartId/product", protect, addProductToCart);

// Get single cart by cart ID
router.get("/:cartId", protect, getSingleCart);

// Clear cart by cart ID
router.delete("/:cartId/clear", protect, clearCart);

// Delete cart by cart ID
router.delete("/:cartId", protect, deleteCart);

module.exports = router;

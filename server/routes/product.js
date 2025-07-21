const express = require("express"); //Express server
const router = express.Router(); //Router instance
const {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController"); //Product Controller connection'
const protect = require("../middleware/authMiddleware"); //Auth Middleware connection

// Create a new product
router.post("/", protect, createProduct);

// Get all products
router.get("/", protect, getAllProducts);

//Get a product by name
router.get("/name/:name", protect, getProductByName);

// Get a product by ID
router.get("/:id", protect, getProductById);

// Update a product by ID
router.put("/:id", protect, updateProduct);

// Delete a product by ID
router.delete("/:id", protect, deleteProduct);

module.exports = router;

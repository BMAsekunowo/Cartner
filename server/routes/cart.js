const express = require('express'); //Express server
const router = express.Router();    //Router instance
const { createCart, getCartByUserId, updateCart, deleteCart } = require('../controllers/cartController');   //Cart Controller connection
const protect = require('../middleware/authMiddleware'); //Auth Middleware connection

// Create a new cart
router.post('/', protect, createCart); 

// Get cart by user ID
router.get('/', protect, getCartByUserId); 

// Update cart by cart ID
router.put('/:cartId', protect, updateCart); 

// Delete cart by cart ID
router.delete('/:cartId', protect, deleteCart); 

module.exports = router;
const express = require('express'); //Express server
const router = express.Router(); //Router instance
const protect = require('../middleware/authMiddleware'); //Authentication Middleware

// Backend Test Op
router.get('/conhealth', (req, res) => {
  res.send('Backend Server is working fine.');
});

//protected route example
router.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route and you have been granted access', user: req.user });
});

module.exports = router;
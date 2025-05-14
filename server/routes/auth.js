const express = require('express'); //Express server
const router = express.Router();    //Router instance
const { registerUser, loginUser } = require('../controllers/authController');   //Controller'
const protect = require('../middleware/authMiddleware'); //Authentication middleware

router.post('/register', registerUser);
router.post('/login', loginUser);   

//Token validation route
router.get('/validate-token', protect, (req, res) => {
    res.status(200).json({
      message: 'Token is valid',
      user: req.user
    });
  });

module.exports = router;
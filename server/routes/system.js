const express = require('express');
const router = express.Router();

// Backend Test Op
router.get('/conhealth', (req, res) => {
  res.send('Backend Server is working fine.');
});

module.exports = router;
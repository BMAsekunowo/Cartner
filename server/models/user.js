const mongoose = require('mongoose'); //Database
// const bcrypt = require('bcryptjs'); //Hashing and Comparison
// const JWT = require('jsonwebtoken'); //Handling Authentication

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
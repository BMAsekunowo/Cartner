const mongoose = require("mongoose"); //Database
const User = require("./user"); //User model

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  avatar: String,
  bio: String,
  location: String,
  languages: [String],
  occupation: String,
  phoneNumber: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

module.exports = mongoose.model("Profile", profileSchema);

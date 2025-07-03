const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    enum: ['Couple', 'Friends', 'Family', 'Solo'],
    required: true
  },
  sessionName: {
    type: String,
    required: true
  },
  participants: {
    type: String,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'ended'],
    default: 'active'
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionCode: {
    type: String,
    required: true,
    unique: true
  },
  passcode: {
    type: String,
    required: false // optional for open sessions
  },
  invitedUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        enum: ['creator', 'participant', 'pending'],
        default: 'participant'
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
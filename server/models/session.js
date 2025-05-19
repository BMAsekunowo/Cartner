const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['couple', 'friends', 'family', 'solo'],
    required: true
  },
  name: {
    type: String,
    required: true
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
        enum: ['creator', 'participant'],
        default: 'participant'
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
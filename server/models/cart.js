const mongoose = require('mongoose'); //Database

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: false
    },

    sessionUsers: [
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
    ],

    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, {timestamps: true});

module.exports = mongoose.model ('Cart', cartSchema);
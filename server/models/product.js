const mongoose = require('mongoose'); //Database
// const bcrypt = require('bcryptjs'); //Hashing and Comparison
// const JWT = require('jsonwebtoken'); //Handling Authentication

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
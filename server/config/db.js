const mongoose = require('mongoose'); //Database
dotenv = require('dotenv'); //Hot-Hush Pagush

//MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
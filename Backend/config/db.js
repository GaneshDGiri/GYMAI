const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Connection String
    // If running locally: 'mongodb://127.0.0.1:27017/gymaiapp'
    // If using Atlas Cloud: process.env.MONGO_URI
    const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gymaiapp';

    await mongoose.connect(dbURI);

    console.log('✅ MongoDB Connected...');
  } catch (err) {
    console.error('❌ Database Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
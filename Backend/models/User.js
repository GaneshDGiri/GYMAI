const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // New Profile Fields
  age: { type: Number },
  gender: { type: String },
  weight: { type: Number }, // in kg
  height: { type: Number }, // in cm
  location: { type: String },
  phone: { type: String },
  emergencyContact: { type: String },
  dob: { type: Date },
  profilePic: { type: String }, // We will store the Image URL string here

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware'); // Import Middleware
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return Token immediately so they are logged in
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secretKey', { expiresIn: 36000 }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate User & Get Token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secretKey', { expiresIn: 36000 }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/me
// @desc    Get current logged in user (for loading profile)
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Don't return password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/auth/profile
// @desc    Update User Profile (Weight, Height, Age, etc.)
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { age, gender, weight, height, location, phone, emergencyContact, dob, profilePic } = req.body;

  // Build profile object
  const profileFields = {};
  if (age) profileFields.age = age;
  if (gender) profileFields.gender = gender;
  if (weight) profileFields.weight = weight;
  if (height) profileFields.height = height;
  if (location) profileFields.location = location;
  if (phone) profileFields.phone = phone;
  if (emergencyContact) profileFields.emergencyContact = emergencyContact;
  if (dob) profileFields.dob = dob;
  if (profilePic) profileFields.profilePic = profilePic;

  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Update
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true } // Return the updated document
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
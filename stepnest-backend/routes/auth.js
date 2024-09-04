const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const otpGenerator = require('otp-generator')

const router = express.Router();

// Register route

router.post('/register', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ firstName, lastName, phoneNumber, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// **Route 1: Request OTP**
// POST /api/auth/forget-password
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiration = Date.now() + 3600000; // 1 hour

    // Save OTP and expiration to user
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Email sending error:', error);
        return res.status(500).json({ msg: 'Error sending email' });
      } else {
        console.log('✅ Email sent:', info.response);
        return res.status(200).json({ msg: 'OTP sent to your email' });
      }
    });
  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.status(500).send('Server error');
  }
});

// **Route 2: Reset Password**
// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Check if OTP is valid
    if (user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiration = undefined;

    // Save updated user
    await user.save();

    res.status(200).json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

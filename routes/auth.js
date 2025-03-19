const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, location } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Validate password (must be exactly 4 digits)
    if (!/^\d{4}$/.test(password)) {
      return res.status(400).json({ message: "Password must be exactly 4 digits" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({ username, email, password: hashedPassword, location });
    await user.save();

    // Auto-create profile
    const profile = new Profile({ 
      userId: user._id, 
      username, 
      email, 
      location 
    });
    await profile.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

// routes/authRoutes.js
// This file defines the REST API endpoints for Sign Up and Log In.

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ----------------------------------------
// POST /api/auth/signup  -> Create a new user
// ----------------------------------------
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 2. Check if the email is already used
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    // 3. Hash the password before saving (never store plain text passwords)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save the new user in MongoDB
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();

    // 5. Send back a success response (never send the password back)
    res.status(201).json({
      message: "Account created successfully",
      user: { id: newUser._id, email: newUser.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

// ----------------------------------------
// POST /api/auth/login  -> Log in an existing user
// ----------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Success
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;

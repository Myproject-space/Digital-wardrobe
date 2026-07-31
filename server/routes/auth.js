const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register API
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Convert email to lowercase for consistent checking
    const normalizedEmail = email ? email.toLowerCase() : "";

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email ? email.toLowerCase() : "";

    // Check user
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Login Success
    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
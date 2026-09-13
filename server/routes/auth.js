const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =========================
// LOGIN API
// =========================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

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


// =========================
// REGISTER API
// =========================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = new User({
      name,
      email: cleanEmail,
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


// =========================
// CHECK EMAIL API
// =========================

router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }

    res.status(200).json({
      message: "Email is registered",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// RESET PASSWORD API
// =========================

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Reset Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// EXPORT ROUTER
// =========================

module.exports = router;
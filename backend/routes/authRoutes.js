const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");


// ===== Register / Send OTP =====
router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: "All fields required" });
  }

  try {

    let user = await User.findOne({ email });

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    if (!user) {

      // create new user
      user = new User({
        name,
        email,
        password,
        otp,
        otpExpiry,
        isVerified: false
      });

    } else {

      // email already registered → resend OTP
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.isVerified = false;

    }

    // send email
    await sendEmail(
      email,
      "OTP Verification",
      `Your OTP for Cloud Storage App is: ${otp}`
    );

    await user.save();

    res.json({ message: "OTP sent to your email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Register error" });
  }

});


// ===== Verify OTP =====
router.post("/verify-otp", async (req, res) => {

  const { email, otp } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    // check expiry
    if (!user.otp || new Date() > user.otpExpiry) {
      return res.json({ message: "OTP expired, please register again" });
    }

    // check OTP
    if (user.otp !== otp) {
      return res.json({ message: "Invalid OTP" });
    }

    // verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "OTP verification error" });

  }

});


// ===== Login =====
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.json({ message: "Please verify your email first" });
    }

    if (user.password !== password) {
      return res.json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      user: user
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Login error" });

  }

});

module.exports = router;
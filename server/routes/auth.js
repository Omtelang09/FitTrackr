const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { username, password, goals } = req.body;
    const newUser = new User({ username, password, goals });
    await newUser.save();
    res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", user });
});

module.exports = router;
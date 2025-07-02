const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  goals: String,
});

module.exports = mongoose.model("User", userSchema);
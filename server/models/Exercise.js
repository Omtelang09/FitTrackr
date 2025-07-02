const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: String,
  group: String,
  name: String,
  sets: Number,
  reps: Number
});

module.exports = mongoose.model("Exercise", exerciseSchema);

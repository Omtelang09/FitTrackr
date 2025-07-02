const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: String,
  type: String,
  duration: Number,
  date: Date,
});

module.exports = mongoose.model("Workout", workoutSchema);
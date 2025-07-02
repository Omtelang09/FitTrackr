const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Add exercise
router.post("/add", async (req, res) => {
  try {
    const { userId, group, name, sets, reps } = req.body;
    const exercise = new Exercise({ userId, group, name, sets, reps });
    const savedExercise = await exercise.save();
    res.status(201).json(savedExercise); // ✅ return the saved exercise
  } catch (err) {
    res.status(500).json({ error: "Failed to save exercise" });
  }
});


// Get exercises by user
router.get("/:userId", async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

// Delete exercise by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Exercise.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json({ message: "Exercise deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete exercise" });
  }
});


module.exports = router;

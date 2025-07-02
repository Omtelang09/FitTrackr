const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.post("/add", async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.json({ message: "Workout added" });
});

router.get("/:userId", async (req, res) => {
  const workouts = await Workout.find({ userId: req.params.userId });
  res.json(workouts);
});

// DELETE /api/workouts/reset/:userId
router.delete("/reset/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await Workout.deleteMany({ userId }); // or whatever your model is
    res.status(200).json({ message: "All workouts deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete workouts." });
  }
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const auth = require('../middleware/authMiddleware'); // Protects routes

// --- "AI" Logic Helper ---
const generateAIPlan = (goal, level) => {
  const exercises = {
    muscle_gain: [
      { name: 'Bench Press', sets: 3, reps: '8-12' },
      { name: 'Squats', sets: 4, reps: '8-10' },
      { name: 'Deadlift', sets: 3, reps: '5' }
    ],
    weight_loss: [
      { name: 'Burpees', sets: 3, reps: '15' },
      { name: 'Jump Rope', sets: 5, duration: '2 mins' },
      { name: 'Sprints', sets: 6, duration: '30s' }
    ],
    flexibility: [
      { name: 'Yoga Flow', sets: 1, duration: '20 mins' },
      { name: 'Static Stretching', sets: 3, duration: '30s' }
    ]
  };

  let selected = exercises[goal] || exercises['muscle_gain'];

  // Simple modification for advanced users
  if (level === 'advanced') {
    selected = selected.map(ex => ({ ...ex, sets: ex.sets + 1 }));
  }
  
  return selected;
};

// @route   POST api/workouts/generate
// @desc    Generate a plan and save it to the user's history
// @access  Private (Requires Login)
router.post('/generate', auth, async (req, res) => {
  try {
    const { goal, level } = req.body;

    // 1. Generate Plan
    const aiPlanData = generateAIPlan(goal, level);

    // 2. Save to DB (linked to the specific user)
    const newWorkout = new Workout({
      user: req.user.id, // Comes from the auth token
      userGoal: goal,
      level: level,
      plan: aiPlanData.map(ex => ({
        exerciseName: ex.name,
        sets: ex.sets,
        reps: ex.reps || "N/A",
        duration: ex.duration || "N/A"
      }))
    });

    const workout = await newWorkout.save();
    res.json({ success: true, workout });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/workouts/history
// @desc    Get all workouts for the logged-in user
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    // Only find workouts belonging to the current user
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
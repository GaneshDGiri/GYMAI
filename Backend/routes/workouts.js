const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');
const User = require('../models/User');

// --- "AI" Logic Helper ---
const generateAIPlan = (goal, level, userProfile) => {
  // We can now use userProfile (weight, gender) to customize the plan!
  
  const baseExercises = {
    muscle_gain: [
      { name: 'Bench Press', sets: 3, reps: '8-12' },
      { name: 'Squats', sets: 4, reps: '8-10' },
      { name: 'Deadlift', sets: 3, reps: '5' }
    ],
    weight_loss: [
      { name: 'Burpees', sets: 3, reps: '15' },
      { name: 'Jump Rope', sets: 5, duration: '2 mins' },
      { name: 'High Knees', sets: 4, duration: '45s' }
    ],
    flexibility: [
      { name: 'Yoga Flow', sets: 1, duration: '20 mins' },
      { name: 'Hamstring Stretch', sets: 3, duration: '30s' }
    ]
  };

  let plan = baseExercises[goal] || baseExercises['muscle_gain'];

  // Adjust for Level
  if (level === 'advanced') {
    plan = plan.map(ex => ({ ...ex, sets: ex.sets + 1 }));
  }

  // Example: Adjust for Gender (Just a logic example)
  if (userProfile && userProfile.gender === 'female' && goal === 'muscle_gain') {
     plan.push({ name: 'Hip Thrusts', sets: 3, reps: '12' });
  }

  return plan;
};

// @route   POST api/workouts/generate
// @desc    Generate a plan and save it
// @access  Private
router.post('/generate', auth, async (req, res) => {
  try {
    const { goal, level } = req.body;
    
    // 1. Get User Profile to make AI smarter
    const user = await User.findById(req.user.id);

    // 2. Generate Plan
    const aiPlanData = generateAIPlan(goal, level, user);

    // 3. Save to DB
    const newWorkout = new Workout({
      user: req.user.id,
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
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
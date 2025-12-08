const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  // Link this workout to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Must match the name in User.js export
    required: true
  },
  userGoal: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  plan: [
    {
      exerciseName: String,
      sets: Number,
      reps: String,
      duration: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
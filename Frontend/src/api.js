import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your Node Server Port

export const generateWorkout = async (goal, level) => {
  try {
    const response = await axios.post(`${API_URL}/generate-workout`, { goal, level });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
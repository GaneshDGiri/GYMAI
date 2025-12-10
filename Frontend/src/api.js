import axios from 'axios';

// --- CONFIGURATION ---
// ✅ UNCOMMENT THIS FOR LOCAL TESTING:
const BASE_URL = 'http://localhost:5000/api';

// ❌ COMMENT THIS OUT (Until you deploy backend to Render/Railway):
// const BASE_URL = 'https://your-app.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to auto-add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['x-auth-token'] = token;
    return config;
});

export default api;

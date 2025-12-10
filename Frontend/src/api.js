import axios from 'axios';

// ❌ COMMENT THIS OUT (Localhost won't work on Vercel)
// const BASE_URL = 'http://localhost:5000/api';

// ✅ UNCOMMENT & USE YOUR NEW RENDER URL:
const BASE_URL = 'https://gymai2.onrender.com/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ... rest of the file

export default api;

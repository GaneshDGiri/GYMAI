import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkoutSession from './components/WorkoutSession';
import About from './components/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import AIWorkoutPlan from './components/AIWorkoutPlan';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      {/* Global Wrapper with Flex column to push footer down */}
      <div className="min-h-screen relative bg-gym-dark flex flex-col font-sans text-slate-200">
        
        {/* --- Background Layers --- */}
        
        {/* 1. Background Image with low opacity */}
        <div 
          className="fixed inset-0 z-0 opacity-10 pointer-events-none"
          style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517963879466-e9b5ce382569?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
          }}
        ></div>
        
        {/* 2. Gradient Overlay for better text readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-gym-dark/90 via-gym-dark/95 to-gym-dark pointer-events-none"></div>

        {/* --- Main Content Area --- */}
        <div className="relative z-10 flex-grow flex flex-col">
          <Navbar />
          
          <main className="flex-grow pt-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Onboarding & User Routes */}
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/profile" element={<UserProfile />} />
              
              {/* Feature Routes */}
              <Route path="/plan" element={<AIWorkoutPlan />} />
              <Route path="/workout" element={<WorkoutSession />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-800 py-8 bg-gym-dark mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                <p>&copy; 2025 GymAI. Powered by MediaPipe & React.</p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
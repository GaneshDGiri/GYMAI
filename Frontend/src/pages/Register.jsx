import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register Data:', formData);
    
    // --- MOCK REGISTER LOGIC ---
    localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
    
    // Trigger event so Navbar updates immediately
    window.dispatchEvent(new Event("storage"));

    // Redirect to Profile Setup to finish onboarding
    navigate('/profile-setup');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-gym-card rounded-2xl border border-gray-800 shadow-2xl animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">Join the AI fitness revolution today</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 mt-1 text-white bg-gym-dark border border-gray-700 rounded-xl focus:border-gym-accent focus:ring-gym-accent focus:outline-none focus:ring-1 transition-colors"
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 mt-1 text-white bg-gym-dark border border-gray-700 rounded-xl focus:border-gym-accent focus:ring-gym-accent focus:outline-none focus:ring-1 transition-colors"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 mt-1 text-white bg-gym-dark border border-gray-700 rounded-xl focus:border-gym-accent focus:ring-gym-accent focus:outline-none focus:ring-1 transition-colors"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-3 mt-1 text-white bg-gym-dark border border-gray-700 rounded-xl focus:border-gym-accent focus:ring-gym-accent focus:outline-none focus:ring-1 transition-colors"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 mt-2 text-sm font-bold text-gym-dark bg-gym-accent rounded-xl hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gym-accent transition-all transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-gym-accent hover:text-emerald-400 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
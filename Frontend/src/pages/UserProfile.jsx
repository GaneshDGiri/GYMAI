/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h2 className="text-2xl font-bold text-white">Please log in to view your profile.</h2>
        <Link to="/login" className="mt-4 inline-block text-gym-accent hover:underline">Go to Login</Link>
      </div>
    );
  }

  const p = user.profile || {};

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="bg-gym-card border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in relative overflow-hidden">
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-gym-accent/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 relative z-10">
          
          {/* PROFILE IMAGE */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gym-dark shadow-lg bg-gym-dark flex items-center justify-center">
             {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full bg-gradient-to-br from-gym-accent to-blue-500 flex items-center justify-center text-4xl font-bold text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
             )}
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-white mb-2">{user.name || "User"}</h1>
            <p className="text-gray-400 text-lg">{user.email}</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-gym-dark border border-gym-accent/30 text-gym-accent text-sm">
                Active Member
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Physical Profile</h3>
        
        {user.profile ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gym-dark p-5 rounded-2xl border border-gray-800 text-center">
                <p className="text-gray-400 text-xs uppercase mb-1">Weight</p>
                <p className="text-2xl font-bold text-white">{p.weight} <span className="text-sm text-gray-500">kg</span></p>
            </div>
            <div className="bg-gym-dark p-5 rounded-2xl border border-gray-800 text-center">
                <p className="text-gray-400 text-xs uppercase mb-1">Height</p>
                <p className="text-2xl font-bold text-white">{p.height} <span className="text-sm text-gray-500">cm</span></p>
            </div>
            <div className="bg-gym-dark p-5 rounded-2xl border border-gray-800 text-center">
                <p className="text-gray-400 text-xs uppercase mb-1">Age</p>
                <p className="text-2xl font-bold text-white">{p.age} <span className="text-sm text-gray-500">yrs</span></p>
            </div>
            <div className="bg-gym-dark p-5 rounded-2xl border border-gray-800 text-center">
                <p className="text-gray-400 text-xs uppercase mb-1">Goal</p>
                <p className="text-xl font-bold text-gym-accent capitalize">{p.goal?.replace('_', ' ')}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gym-dark rounded-2xl border border-dashed border-gray-700">
             <p className="text-gray-400 mb-4">You haven't set up your profile yet.</p>
             <Link to="/profile-setup" className="text-gym-accent font-bold hover:underline">Complete Setup Now &rarr;</Link>
          </div>
        )}

        <div className="mt-12 flex justify-end">
            <Link to="/plan" className="px-6 py-3 bg-gym-card border border-gray-600 rounded-xl text-white hover:bg-gray-700 transition-colors">
                View Latest Report
            </Link>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
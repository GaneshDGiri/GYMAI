import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'muscle_gain',
    activityLevel: 'moderate',
    profileImage: '' // Stores the Base64 string
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoalSelect = (goal) => {
    setFormData({ ...formData, goal });
  };

  // Handle Image Upload & Convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Save profile data AND the image to the user object
    const updatedUser = { 
      ...existingUser, 
      profile: formData,
      profileImage: formData.profileImage // Save image at top level for easy access
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update Navbar immediately
    window.dispatchEvent(new Event("storage"));

    navigate('/plan'); 
  };

  const goals = [
    { id: 'weight_loss', label: 'Lose Weight', icon: '🔥' },
    { id: 'muscle_gain', label: 'Build Muscle', icon: '💪' },
    { id: 'endurance', label: 'Endurance', icon: '🏃' },
    { id: 'flexibility', label: 'Flexibility', icon: '🧘' }
  ];

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gym-card rounded-3xl border border-gray-800 p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Setup Your <span className="text-gym-accent">Profile</span>
          </h2>
          <p className="text-gray-400">Upload a photo and set your stats.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- Image Upload Section --- */}
          <div className="flex flex-col items-center justify-center space-y-4">
             <div className="relative w-32 h-32">
                {previewImage ? (
                    <img 
                        src={previewImage} 
                        alt="Profile Preview" 
                        className="w-full h-full rounded-full object-cover border-4 border-gym-accent shadow-lg"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-gym-dark border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500">
                        <span className="text-4xl">📷</span>
                    </div>
                )}
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    accept="image/*"
                    id="profile-upload"
                    className="hidden"
                    onChange={handleImageChange}
                />
                {/* Upload Button overlay */}
                <label 
                    htmlFor="profile-upload" 
                    className="absolute bottom-0 right-0 bg-gym-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </label>
             </div>
             <p className="text-sm text-gray-400">Tap to upload profile picture</p>
          </div>

          {/* Section 1: Physical Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 uppercase">Age</label>
              <input type="number" name="age" required placeholder="25" className="w-full bg-gym-dark border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gym-accent transition-all" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 uppercase">Gender</label>
              <select name="gender" className="w-full bg-gym-dark border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gym-accent transition-all" onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 uppercase">Height (cm)</label>
              <input type="number" name="height" required placeholder="175" className="w-full bg-gym-dark border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gym-accent transition-all" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 uppercase">Weight (kg)</label>
              <input type="number" name="weight" required placeholder="70" className="w-full bg-gym-dark border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gym-accent transition-all" onChange={handleChange} />
            </div>
          </div>

          {/* Section 2: Goal */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300 uppercase">Primary Goal</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {goals.map((g) => (
                <div key={g.id} onClick={() => handleGoalSelect(g.id)} className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-center hover:scale-105 ${formData.goal === g.id ? 'border-gym-accent bg-gym-accent/10' : 'border-gray-700 bg-gym-dark'}`}>
                  <div className="text-3xl mb-2">{g.icon}</div>
                  <div className={`text-sm font-bold ${formData.goal === g.id ? 'text-white' : 'text-gray-400'}`}>{g.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Activity */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 uppercase">Activity Level</label>
            <select name="activityLevel" className="w-full bg-gym-dark border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gym-accent transition-all" onChange={handleChange}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="active">Active</option>
                <option value="athlete">Athlete</option>
            </select>
          </div>

          <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-gym-accent to-emerald-600 text-gym-dark font-extrabold text-lg rounded-xl hover:shadow-lg transition-all">
            Save Profile & Generate Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
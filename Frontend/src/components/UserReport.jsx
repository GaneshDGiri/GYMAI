import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const UserReport = () => {
  // Dummy data - In real app, fetch this from backend
  const data = [
    { day: 'Mon', calories: 300, duration: 45 },
    { day: 'Tue', calories: 450, duration: 60 },
    { day: 'Wed', calories: 200, duration: 30 },
    { day: 'Thu', calories: 500, duration: 70 },
    { day: 'Fri', calories: 350, duration: 50 },
    { day: 'Sat', calories: 600, duration: 90 },
    { day: 'Sun', calories: 100, duration: 20 },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg m-4 text-white">
      <h2 className="text-2xl mb-4 text-green-400">Weekly Progress</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#333' }} />
            <Bar dataKey="calories" fill="#8884d8" name="Calories Burned" />
            <Bar dataKey="duration" fill="#82ca9d" name="Duration (mins)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserReport;
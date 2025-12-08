// src/components/BodyTarget.jsx
import React, { useState } from 'react';

const BodyTarget = () => {
  const [selectedPart, setSelectedPart] = useState('Chest');
  // Use generic placeholders
  const imageUrl = `https://placehold.co/400x500/1e293b/FFF?text=${selectedPart}`;

  return (
    <div className="bg-gym-card p-6 rounded-2xl border border-white/10 h-full flex flex-col items-center">
      <h2 className="text-white font-bold mb-4">Target Zone</h2>
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {['Chest', 'Back', 'Legs', 'Arms'].map(part => (
          <button key={part} onClick={() => setSelectedPart(part)} 
            className={`px-3 py-1 rounded text-sm ${selectedPart === part ? 'bg-gym-blue text-white' : 'bg-gray-700 text-gray-300'}`}>
            {part}
          </button>
        ))}
      </div>
      <img src={imageUrl} alt="Body Part" className="rounded-lg shadow-lg w-full object-cover flex-grow" />
    </div>
  );
};

export default BodyTarget;
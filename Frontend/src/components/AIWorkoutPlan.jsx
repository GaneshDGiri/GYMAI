import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AIWorkoutPlan = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock Data for the Report
  const reportData = {
    bmi: '22.4',
    bodyType: 'Mesomorph',
    metabolism: 'High',
    focusArea: 'Upper Body Strength',
    recoveryRate: 'Optimal'
  };

  // Mock Data for Suggested Workouts
  const suggestions = [
    {
      name: 'Incline Dumbbell Press',
      sets: '4',
      reps: '10-12',
      focus: 'Upper Chest',
      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Barbell Squats',
      sets: '3',
      reps: '8-10',
      focus: 'Quadriceps & Glutes',
      img: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Lateral Raises',
      sets: '3',
      reps: '15',
      focus: 'Shoulder Width',
      img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const handleScan = () => {
    if (showResults) return; // Prevent re-scanning if already done
    setAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          AI <span className="text-gym-accent">Body Analysis</span>
        </h1>
        <p className="text-gray-400">
          Click the body scan image below to generate your personalized health report and workout plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: Interactive Scan Image */}
        <div className="relative group cursor-pointer" onClick={handleScan}>
           {/* Image Container */}
           <div className="relative rounded-3xl overflow-hidden border-2 border-gray-800 group-hover:border-gym-accent transition-colors duration-300 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Body Scan Target" 
                className={`w-full h-[500px] object-cover transition-opacity duration-300 ${analyzing ? 'opacity-50' : 'opacity-80 group-hover:opacity-100'}`}
              />
              
              {/* Overlay Instructions */}
              {!analyzing && !showResults && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] group-hover:bg-transparent transition-all">
                   <div className="px-6 py-3 bg-gym-accent/90 rounded-full text-gym-dark font-bold shadow-lg animate-bounce">
                      👆 Click to Scan
                   </div>
                </div>
              )}

              {/* Scanning Effect Overlay */}
              {analyzing && (
                <div className="absolute inset-0 z-20">
                    <div className="w-full h-1 bg-gym-accent shadow-[0_0_20px_#10b981] animate-[scan_2s_ease-in-out_infinite] absolute top-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gym-accent animate-pulse">ANALYZING PHYSIQUE...</span>
                    </div>
                </div>
              )}
              
              {/* Success Overlay */}
              {showResults && (
                 <div className="absolute top-4 right-4 bg-gym-dark/80 backdrop-blur-md px-4 py-2 rounded-lg border border-gym-accent text-gym-accent font-bold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Analysis Complete
                 </div>
              )}
           </div>
        </div>

        {/* RIGHT COLUMN: Results & Report */}
        <div className="space-y-8">
           
           {/* Placeholder while waiting */}
           {!showResults && !analyzing && (
              <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-800 rounded-3xl text-gray-500">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-xl font-semibold">Waiting for scan data...</p>
              </div>
           )}

           {/* Generated Report */}
           {showResults && (
              <div className="animate-fade-in space-y-8">
                  
                  {/* Stats Grid */}
                  <div className="bg-gym-card rounded-2xl p-6 border border-gray-800 shadow-lg">
                      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Physique Report</h3>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gym-dark rounded-xl">
                              <p className="text-xs text-gray-400 uppercase">BMI Score</p>
                              <p className="text-2xl font-bold text-gym-accent">{reportData.bmi}</p>
                          </div>
                          <div className="p-3 bg-gym-dark rounded-xl">
                              <p className="text-xs text-gray-400 uppercase">Body Type</p>
                              <p className="text-2xl font-bold text-white">{reportData.bodyType}</p>
                          </div>
                          <div className="p-3 bg-gym-dark rounded-xl">
                              <p className="text-xs text-gray-400 uppercase">Metabolism</p>
                              <p className="text-2xl font-bold text-gym-blue">{reportData.metabolism}</p>
                          </div>
                          <div className="p-3 bg-gym-dark rounded-xl">
                              <p className="text-xs text-gray-400 uppercase">Recovery</p>
                              <p className="text-2xl font-bold text-green-400">{reportData.recoveryRate}</p>
                          </div>
                      </div>
                  </div>

                  {/* Workout Suggestions */}
                  <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Recommended Workouts</h3>
                      <div className="space-y-4">
                          {suggestions.map((workout, index) => (
                              <div key={index} className="flex bg-gym-card rounded-xl overflow-hidden border border-gray-800 hover:border-gym-accent transition-colors group">
                                  <div className="w-24 h-24 flex-shrink-0">
                                      <img src={workout.img} alt={workout.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="p-4 flex-grow flex justify-between items-center">
                                      <div>
                                          <h4 className="text-white font-bold text-lg group-hover:text-gym-accent transition-colors">{workout.name}</h4>
                                          <p className="text-sm text-gray-400">{workout.focus}</p>
                                      </div>
                                      <div className="text-right">
                                          <p className="text-white font-bold">{workout.sets} Sets</p>
                                          <p className="text-xs text-gym-blue">{workout.reps} Reps</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* CTA Button */}
                  <Link to="/workout" className="block w-full py-4 bg-gym-accent text-gym-dark font-extrabold text-center rounded-xl hover:bg-emerald-400 transform hover:-translate-y-1 transition-all shadow-lg shadow-gym-accent/20">
                      Start This Plan Now
                  </Link>

              </div>
           )}
        </div>
      </div>

      {/* Add Custom Scan Animation Keyframes inline style for this component specifically if needed, 
          though usually we add to index.css. Here uses standard utility logic. */}
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AIWorkoutPlan;
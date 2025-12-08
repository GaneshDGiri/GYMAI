import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';
import BodyTarget from './BodyTarget'; 
import { generateWorkout } from '../api'; // Ensure this matches your file path

const Home = () => {
  // --- State ---
  const [goal, setGoal] = useState('muscle_gain');
  const [level, setLevel] = useState('beginner');
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // --- Camera State ---
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  // --- API Handler ---
  const handleGenerate = async () => {
    setLoading(true);
    // Simulate API call delay if testing without backend
    // await new Promise(r => setTimeout(r, 1000)); 
    const data = await generateWorkout(goal, level);
    
    if (data && data.workout) {
      setWorkout(data.workout);
    } else {
      // Fallback if API fails (for demo purposes)
      setWorkout({
        plan: [
          { exerciseName: "Pushups (Offline Mode)", sets: 3, reps: "12" },
          { exerciseName: "Squats", sets: 4, reps: "15" }
        ]
      });
    }
    setLoading(false);
  };

  // --- AI Vision Handler ---
  const onResults = (results) => {
    if (!canvasRef.current || !webcamRef.current?.video) return;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
    
    // Draw Video Feed
    canvasCtx.drawImage(results.image, 0, 0, videoWidth, videoHeight);
    
    // Draw Skeleton Overlay
    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                     { color: '#10b981', lineWidth: 4 });
      drawLandmarks(canvasCtx, results.poseLandmarks,
                    { color: '#3b82f6', lineWidth: 2 });
    }
    canvasCtx.restore();
  };

  useEffect(() => {
    if (cameraActive) {
      const pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);

      if (webcamRef.current && webcamRef.current.video) {
        cameraRef.current = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (webcamRef.current && webcamRef.current.video) {
              await pose.send({ image: webcamRef.current.video });
            }
          },
          width: 640,
          height: 480,
        });
        cameraRef.current.start();
      }
    }
  }, [cameraActive]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in pb-10">
      
      {/* 1. Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Your AI <span className="text-gradient">Personal Trainer</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Generate custom workout plans and perfect your form with real-time AI computer vision.
        </p>
      </div>

      {/* 2. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Workout Generator */}
        <div className="glass-card p-6 h-fit">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-blue-500 rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-white">Generator</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm font-semibold mb-2 block">Fitness Goal</label>
              <select 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)} 
                className="input-field cursor-pointer"
              >
                <option value="muscle_gain">Muscle Gain</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="flexibility">Flexibility</option>
              </select>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm font-semibold mb-2 block">Experience Level</label>
              <select 
                value={level} 
                onChange={(e) => setLevel(e.target.value)} 
                className="input-field cursor-pointer"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing Profile...' : 'Generate Plan'}
            </button>
          </div>

          {/* Results Area */}
          {workout && (
            <div className="mt-8 pt-6 border-t border-gray-700 animate-fade-in">
              <h3 className="text-green-400 font-bold mb-4 flex items-center">
                <span className="text-xl mr-2">✓</span> Your Custom Plan
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {workout.plan.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-900/40 p-3 rounded-lg border border-gray-700 hover:border-blue-500/50 transition">
                    <span className="font-medium text-gray-200">{item.exerciseName}</span>
                    <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                      {item.sets} x {item.reps || item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle Column: Body Visualizer */}
        <div className="glass-card p-6 h-full min-h-[400px] flex flex-col">
           <BodyTarget />
        </div>

        {/* Right Column / Bottom: AI Camera */}
        <div className="glass-card p-6 lg:col-span-1 xl:col-span-3">
           <div className="flex justify-between items-center mb-6">
             <div className="flex items-center">
               <div className="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
               <h2 className="text-2xl font-bold text-white">AI Form Check</h2>
             </div>
             <button 
                onClick={() => setCameraActive(!cameraActive)}
                className={`px-6 py-2 rounded-lg font-bold transition shadow-lg ${
                  cameraActive 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white' 
                    : 'bg-green-500/10 text-green-500 border border-green-500/50 hover:bg-green-500 hover:text-white'
                }`}
             >
                {cameraActive ? 'Stop Camera' : 'Start Camera'}
             </button>
           </div>

           <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center group">
              {cameraActive ? (
                <>
                  <Webcam 
                    ref={webcamRef} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    videoConstraints={{ facingMode: "user" }}
                  />
                  <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-green-400 border border-green-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    AI Tracking Active
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto text-4xl text-gray-600 group-hover:text-blue-500 transition duration-300">
                    📷
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-300">Camera is Off</p>
                    <p className="text-sm text-gray-500 mt-2">Click "Start Camera" to enable skeletal tracking</p>
                  </div>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
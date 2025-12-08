/* eslint-disable react-hooks/set-state-in-effect */
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Link } from 'react-router-dom';

const WorkoutSession = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // New States for detection
  const [isPoseValid, setIsPoseValid] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Function to simulate checking if the pose is "correct"
  // In a real app, you would calculate angles (e.g., knee > 90deg)
  const validatePose = (landmarks) => {
    if (!landmarks) return false;
    
    // Simple check: Are key points (nose, shoulders, hips) visible?
    // Visibility score ranges from 0.0 to 1.0
    const keyPoints = [0, 11, 12, 23, 24]; // Nose, Shoulders, Hips
    const isVisible = keyPoints.every(index => landmarks[index] && landmarks[index].visibility > 0.5);
    
    return isVisible;
  };

  const onResults = (results) => {
    if (!canvasRef.current) return;
    
    const canvasCtx = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;
    
    // Clear the canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, width, height);
    
    // Check pose validity
    let isValid = false;
    if (results.poseLandmarks) {
        isValid = validatePose(results.poseLandmarks);
        
        // Draw the skeleton
        // Color changes based on validity (Green if good, Red/White if not)
        const connectorColor = isValid ? '#10b981' : '#ef4444'; // gym-accent vs red
        const landmarkColor = isValid ? '#3b82f6' : '#ffffff';

        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: connectorColor,
            lineWidth: 4
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
            color: landmarkColor,
            lineWidth: 2,
            radius: 4
        });
    }
    
    // Update state only if changed to prevent re-render loops
    if (isValid !== isPoseValid) {
        setIsPoseValid(isValid);
    }

    canvasCtx.restore();
  };

  // Initialize MediaPipe
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    let camera = null;

    if (webcamRef.current && webcamRef.current.video) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (webcamRef.current && webcamRef.current.video) {
             await pose.send({ image: webcamRef.current.video });
          }
        },
        width: 640,
        height: 480,
      });
      
      if(cameraActive) {
          setLoading(true);
          camera.start().then(() => setLoading(false));
      }
    }

    return () => {
        if(camera) camera.stop();
    };
  }, [cameraActive, isPoseValid]); // Added isPoseValid to dependency to ensure state updates

  const handleComplete = () => {
      setCameraActive(false);
      setIsCompleted(true);
  };

  // --- Render Summary View if Completed ---
  if (isCompleted) {
      return (
          <div className="flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
              <div className="bg-gym-card p-8 rounded-2xl border border-gym-accent shadow-2xl text-center max-w-md w-full animate-fade-in">
                  <div className="w-20 h-20 bg-gym-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">🎉</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Workout Complete!</h2>
                  <p className="text-gray-400 mb-8">Great job keeping your form correct.</p>
                  
                  <div className="space-y-4">
                      <div className="flex justify-between p-4 bg-gym-dark rounded-xl">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white font-bold">12:30</span>
                      </div>
                      <div className="flex justify-between p-4 bg-gym-dark rounded-xl">
                          <span className="text-gray-400">Accuracy</span>
                          <span className="text-gym-accent font-bold">98%</span>
                      </div>
                  </div>

                  <Link to="/" className="block w-full py-4 mt-8 bg-gym-accent text-gym-dark font-bold rounded-xl hover:bg-emerald-400 transition-colors">
                      Back to Home
                  </Link>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          AI Workout <span className="text-gym-accent">Session</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {isPoseValid ? "Great form! Hold it there." : "Ensure your full body is visible to start."}
        </p>
      </div>

      {/* Camera Container */}
      <div className={`relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 transition-colors duration-300 ${isPoseValid ? 'border-gym-accent' : 'border-gray-800'}`}>
        
        {!cameraActive && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gym-card/80 backdrop-blur-sm">
                <button 
                    onClick={() => setCameraActive(true)}
                    className="px-8 py-4 bg-gym-accent text-gym-dark font-bold rounded-xl hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-lg shadow-gym-accent/20"
                >
                    Start Camera
                </button>
                <p className="mt-4 text-sm text-gray-300">Camera permission required</p>
             </div>
        )}

        {loading && cameraActive && (
             <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/80">
                <div className="w-12 h-12 border-4 border-gym-accent border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-4 text-gym-accent font-medium">Loading AI Models...</span>
             </div>
        )}

        {cameraActive && (
            <>
                <Webcam
                    ref={webcamRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    mirrored={true}
                />
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    width={640}
                    height={480}
                />

                {/* VISUAL OVERLAY FOR STATUS */}
                <div className="absolute top-4 right-4 z-20">
                    <div className={`px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md border ${isPoseValid ? 'bg-gym-accent/20 border-gym-accent text-gym-accent' : 'bg-red-500/20 border-red-500 text-red-500'}`}>
                        {isPoseValid ? "● Form Detected" : "○ Adjust Position"}
                    </div>
                </div>

                {/* COMPLETE BUTTON - Only shows when Pose is Valid */}
                {isPoseValid && (
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 animate-fade-in">
                        <button 
                            onClick={handleComplete}
                            className="flex items-center gap-2 px-8 py-4 bg-gym-accent text-gym-dark font-extrabold text-lg rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105 transition-transform hover:bg-emerald-400"
                        >
                            <span>Complete Workout</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                    </div>
                )}
            </>
        )}
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="bg-gym-card p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-400 text-sm font-semibold uppercase">Reps</h3>
            <p className="text-3xl font-bold text-white mt-1">0</p>
          </div>
          <div className="bg-gym-card p-6 rounded-xl border border-gray-700 transition-colors duration-300" style={{borderColor: isPoseValid ? '#10b981' : '#374151'}}>
            <h3 className="text-gray-400 text-sm font-semibold uppercase">Status</h3>
            <p className={`text-3xl font-bold mt-1 ${isPoseValid ? 'text-gym-accent' : 'text-gray-500'}`}>
                {isPoseValid ? "Correct" : "Searching..."}
            </p>
          </div>
          <div className="bg-gym-card p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-400 text-sm font-semibold uppercase">Calories</h3>
            <p className="text-3xl font-bold text-gym-blue mt-1">0</p>
          </div>
      </div>
    </div>
  );
};

export default WorkoutSession;
  
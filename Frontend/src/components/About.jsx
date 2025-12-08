import React from 'react';

const About = () => {
  return (
    <section className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Meet Your <span className="text-gym-accent">AI Trainer</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Built with advanced Computer Vision technology to democratize personal training.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
            <div className="bg-gym-card p-6 rounded-2xl border border-gray-800 hover:border-gym-accent/50 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-3">Real-Time Pose Estimation</h3>
                <p className="text-gray-400">
                    We use MediaPipe's BlazePose model to track 33 3D landmarks on your body in real-time. This allows us to calculate joint angles and verify your form instantly without sending video data to any server.
                </p>
            </div>
            <div className="bg-gym-card p-6 rounded-2xl border border-gray-800 hover:border-gym-blue/50 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-3">Privacy First</h3>
                <p className="text-gray-400">
                    All processing happens locally on your device. Your camera feed is never recorded or stored, ensuring your privacy while you workout in the comfort of your home.
                </p>
            </div>
            <div className="bg-gym-card p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-3">Adaptive Difficulty</h3>
                <p className="text-gray-400">
                    The AI learns from your performance. If a workout is too easy, it suggests more reps or harder variations. If your form breaks down, it suggests corrections.
                </p>
            </div>
        </div>
        <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <img 
                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80" 
                alt="AI Technology visualization" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gym-dark to-transparent"></div>
            <div className="absolute bottom-6 left-6">
                <div className="inline-block px-4 py-1 rounded-full bg-gym-blue text-xs font-bold text-white mb-2">BETA</div>
                <h4 className="text-xl font-bold text-white">Powered by TensorFlow & React</h4>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
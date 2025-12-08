import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gym-card border border-gym-accent/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-gym-accent mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-gym-accent">AI-Powered Training</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
              Sculpt Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gym-accent to-gym-blue">Dream Body</span> with AI
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Generate personalized workout plans instantly. Our AI analyzes your goals and fitness level to create the perfect routine for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/workout" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gym-dark transition-all duration-200 bg-gym-accent rounded-xl hover:bg-emerald-400 hover:shadow-lg hover:shadow-gym-accent/30 hover:-translate-y-1">
                Start Session
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gym-card border border-gray-700 rounded-xl hover:bg-gray-700 hover:border-gray-600">
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gray-800 pt-8">
                <div>
                    <p className="text-3xl font-bold text-white">10k+</p>
                    <p className="text-sm text-gray-500">Users</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-white">500+</p>
                    <p className="text-sm text-gray-500">Exercises</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-white">98%</p>
                    <p className="text-sm text-gray-500">Satisfaction</p>
                </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="relative lg:ml-auto">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-gym-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-gym-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gym-card/50 backdrop-blur-sm">
                <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                    alt="Athlete working out" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
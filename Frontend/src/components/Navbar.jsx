import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
      else setUser(null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    setShowDropdown(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? "text-gym-accent" : "text-gray-300 hover:text-white";

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-gym-dark/80 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-gym-accent rounded-lg">
                <svg className="w-6 h-6 text-gym-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">Gym<span className="text-gym-accent">AI</span></span>
        </Link>
        
        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gym-card md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            <li><Link to="/" onClick={() => setIsOpen(false)} className={`block py-2 px-3 rounded md:p-0 transition-colors ${isActive('/')}`}>Home</Link></li>
            <li><Link to="/workout" onClick={() => setIsOpen(false)} className={`block py-2 px-3 rounded md:p-0 transition-colors ${isActive('/workout')}`}>Workouts</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)} className={`block py-2 px-3 rounded md:p-0 transition-colors ${isActive('/about')}`}>About AI</Link></li>
            
            <li className="my-2 md:hidden border-t border-gray-700"></li>

            {!user ? (
              <>
                <li><Link to="/login" className="block py-2 px-3 text-gray-300 hover:text-white rounded md:p-0">Login</Link></li>
                <li><Link to="/register" className="block py-2 px-4 mt-2 md:mt-0 text-gym-dark bg-gym-accent rounded-lg hover:bg-emerald-400 font-bold text-center transition-all hover:scale-105">Sign Up</Link></li>
              </>
            ) : (
              <li className="relative" ref={dropdownRef}>
                 <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 focus:outline-none"
                 >
                    {/* AVATAR LOGIC */}
                    {user.profileImage ? (
                        <img 
                            src={user.profileImage} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-gym-accent transition-all"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gym-accent to-blue-500 flex items-center justify-center text-white font-bold border-2 border-transparent hover:border-white transition-all">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                    )}
                    
                    <span className="md:hidden text-white font-medium">{user.name}</span>
                 </button>

                 {/* DROPDOWN MENU */}
                 {showDropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-gym-card border border-gray-700 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                        <div className="px-4 py-3 border-b border-gray-700">
                            <span className="block text-sm text-white">{user.name || "User"}</span>
                            <span className="block text-xs text-gray-400 truncate">{user.email}</span>
                        </div>
                        <ul className="py-1">
                            <li><Link to="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">My Profile</Link></li>
                            <li><Link to="/plan" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">My Plans</Link></li>
                            <li><button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">Sign out</button></li>
                        </ul>
                    </div>
                 )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
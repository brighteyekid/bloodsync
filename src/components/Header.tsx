import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, User, LogOut, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check for user data in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsProfileOpen(false);
    navigate('/login');
  };

  if (user) return null;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12">
        <div className={`relative flex items-center justify-between px-8 py-4 rounded-[2.5rem] transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20' 
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-red-600 p-2.5 rounded-2xl shadow-[0_8px_20px_rgba(220,38,38,0.3)] group-hover:rotate-[15deg] transition-transform duration-500">
              <Activity className="text-white text-2xl" />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              BLOOD<span className="text-red-600 italic">SYNC</span>
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest transition-all uppercase ${
                  isScrolled 
                    ? 'bg-gray-900 text-white shadow-xl hover:shadow-gray-900/20' 
                    : 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20'
                }`}
              >
                Sign In
              </motion.button>
            </Link>
            <Link to="/signup" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all uppercase"
              >
                Join Now
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

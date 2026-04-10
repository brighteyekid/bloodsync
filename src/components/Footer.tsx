import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Share2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8f9fa] pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-6 uppercase italic">
              BloodSync <span className="text-red-600 not-italic">Clinical</span>
            </h2>
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest leading-loose max-w-sm">
              Connecting vital resources to those in need through clinical precision and human vitality.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-8">Explore</h4>
              <ul className="space-y-4">
                <li><Link to="/contact" className="text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-8">Support</h4>
              <ul className="space-y-4">
                <li><Link to="/terms" className="text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors">Emergency Support</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} BloodSync Clinical. All Rights Reserved.
          </p>
          
          <div className="flex items-center space-x-8 text-gray-400">
            <motion.button whileHover={{ scale: 1.1, color: '#dc2626' }}>
              <Globe size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1, color: '#dc2626' }}>
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

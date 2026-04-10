import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check credentials.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await api.post('/api/auth/google', {
        credential: credentialResponse.credential,
      });
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Google login failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white pt-24 md:pt-0">
      {/* Left Side - Image and Branding */}
      <div className="w-full md:w-1/2 relative hidden md:block overflow-hidden min-h-[600px]">
        <img 
          src="/blood_sample.png" 
          alt="Blood Logistics" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        
        {/* Top Badge (Lowered to avoid header) */}
        <div className="absolute top-28 left-8">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-sm border border-white/20">
            <CheckCircle2 size={10} className="text-red-600" />
            <span className="text-[8px] font-black tracking-[0.2em] text-gray-800 uppercase">Global Compliance Certified</span>
          </div>
        </div>

        {/* Bottom Text Content */}
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <h1 className="text-4xl font-black tracking-tighter mb-2 opacity-100">
            BLOOD<span className="text-white/80">SYNC</span>
          </h1>
          <p className="text-lg font-bold leading-snug mb-5 max-w-xs">
            Pioneering the future of clinical blood logistics.
          </p>
          <div className="flex items-center space-x-3 text-white/70">
            <span className="h-0.5 w-5 bg-white/30" />
            <p className="text-[10px] font-semibold tracking-wide">
              Clinical Precision. Human Vitality.
            </p>
          </div>
        </div>

        {/* Bottom Floating Icon */}
        <div className="absolute bottom-10 left-10">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-xl">
            <Briefcase size={16} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 md:py-24">
        <div className="max-w-[340px] w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-1.5 tracking-tight">Sign In</h2>
            <p className="text-gray-500 font-medium text-xs">Access your secure logistics dashboard.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 px-3 py-2.5 rounded-xl text-[10px] font-bold mb-5 border border-red-100 flex items-center"
            >
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2 shrink-0" />
              {error}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="group">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1.5 ml-1 transition-colors group-focus-within:text-red-600">
                Email / Personnel ID
              </label>
              <input
                type="email"
                required
                className="block w-full px-4 py-3 bg-gray-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-red-600 focus:ring-0 outline-none transition-all placeholder:text-gray-300 text-gray-900 font-semibold text-xs"
                placeholder="name@bloodsync.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-1.5 px-1">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.15em] transition-colors group-focus-within:text-red-600">
                  Password
                </label>
                <Link to="#" className="text-[8px] font-bold text-red-600 uppercase tracking-widest hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                className="block w-full px-4 py-3 bg-gray-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-red-600 focus:ring-0 outline-none transition-all placeholder:text-gray-300 text-gray-900 font-semibold tracking-widest text-xs"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01, translateY: -0.5 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3.5 bg-red-600 text-white rounded-full font-black text-[10px] tracking-widest shadow-md shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300"
            >
              Secure Sign In
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-gray-100" />
              <span className="bg-white px-3 text-[8px] font-black text-gray-300 uppercase tracking-[0.15em] absolute italic">Institutional Access</span>
            </div>

            <div className="flex justify-center mb-6 scale-[0.85]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                theme="outline"
                shape="pill"
                width="100%"
                text="continue_with"
              />
            </div>

            <p className="text-gray-500 font-medium text-[11px]">
              New to the network?{' '}
              <Link to="/signup" className="text-red-600 font-black hover:underline underline-offset-4 ml-1">
                Create an Account
              </Link>
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-50 text-center">
            <div className="w-8 h-0.5 bg-gray-100 mx-auto rounded-full mb-3" />
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Secure Gateway V3</p>
            <p className="text-[8px] font-bold text-gray-400">Clinical Precision. Human Vitality.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

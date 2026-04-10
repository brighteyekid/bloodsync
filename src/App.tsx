import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import BloodDonate from './pages/BloodDonate';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RequestBlood from './pages/RequestBlood';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import News from './pages/News';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import BootSplash from './components/BootSplash';
import ChatButton from './components/ChatButton';
import './App.css';

import Sidebar from './components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import api from './api/axios';

const UserLayout: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/current_user');
        if (response.data.status === 'success') {
          setUser(response.data.user);
          setStats(response.data.stats);
        }
      } catch (err) {
        console.error("Layout auth failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [location.pathname]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex bg-[#f8f9fa] min-h-screen">
      <Sidebar user={user} stats={stats} />
      <main className="flex-1 overflow-y-auto">
        <Outlet context={{ user, stats }} />
      </main>
      <ChatButton />
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) setUser(JSON.parse(userData));
  }, [location.pathname]);

  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App flex flex-col min-h-screen overflow-x-hidden">
      {!user && <Header />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Area */}
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blood-donate" element={<BloodDonate />} />
            <Route path="/request-blood" element={<RequestBlood />} />
            <Route path="/services" element={<Services />} />
            <Route path="/user/:username" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {!user && !isAuthRoute && <Footer />}
      {!user && <ChatButton />}
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <BootSplash />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

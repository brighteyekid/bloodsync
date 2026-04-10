import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  HeartPulse, 
  Hospital, 
  Users, 
  ArrowRight, 
  Activity, 
  TrendingUp, 
  Quote, 
  Search, 
  Maximize2, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import api from '../api/axios';

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      await api.post('/api/messages', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const galleryItems = [
    { id: 1, category: 'Process', title: 'Precision Donation', image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80' },
    { id: 2, category: 'Laboratory', title: 'Advanced Testing', image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=80' },
    { id: 3, category: 'Logistics', title: 'Secured Transit', image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans text-gray-900">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute top-0 right-0 w-[45%] h-full bg-red-600 rounded-bl-[15rem] -z-10 hidden lg:block" />
        <div className="container mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full mb-8 border border-red-100 shadow-sm">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase">Every drop counts • Real-time Sync</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter">
              VITALITY <br />
              <span className="text-red-600 italic">SYNCED.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed font-bold italic">
              Pioneering the future of life-saving logistics. We connect donors and clinics with institutional precision.
            </p>
            <div className="flex flex-col sm:row gap-6">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white px-10 py-5 rounded-3xl font-black shadow-2xl flex items-center space-x-4 tracking-widest text-xs uppercase"
                >
                  <span>JOIN THE NETWORK</span>
                  <ArrowRight size={16} className="text-red-600" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white/30 backdrop-blur-md">
              <img 
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80" 
                alt="Clinical Excellence" 
                className="w-full h-[650px] object-cover hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <p className="text-4xl font-black leading-tight italic tracking-tighter">"Connecting vital resources to those in need."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-[#f8f9fa] border-y border-gray-100">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Lives Saved', value: '15.4k+', icon: <HeartPulse /> },
              { label: 'Network Cells', value: '8.2k+', icon: <Users /> },
              { label: 'Care Partners', value: '320+', icon: <Hospital /> },
              { label: 'Relay Speed', value: '<2m', icon: <Activity /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm text-center group hover:shadow-red-600/10 transition-all border-b-4 border-b-transparent hover:border-b-red-600"
              >
                <div className="text-gray-200 mb-6 group-hover:text-red-600 transition-colors flex justify-center">
                    {React.cloneElement(stat.icon as React.ReactElement, { size: 40 })}
                </div>
                <h3 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">{stat.value}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-white">
        <div className="container mx-auto px-8 max-w-6xl">
           <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-1/2">
                 <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-4">Institutional Core</h2>
                 <h3 className="text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
                    Pioneering <span className="text-red-600 italic">Clinical</span> Solidarity.
                 </h3>
                 <p className="text-lg text-gray-500 font-bold mb-10 leading-relaxed italic">
                    BloodSync Life is a clinical movement dedicated to ensuring no human life is ever lost to logistics failures. We provide the infrastructure for a more resilient future.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { title: 'Safe Chain', text: 'Secured direct-to-clinic pipelines' },
                      { title: 'Global Reach', text: 'Resilience network ready for 24/7 ops' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <h4 className="font-black text-red-600 text-xs uppercase tracking-widest">{item.title}</h4>
                        <p className="text-xs font-bold text-gray-400">{item.text}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 relative">
                 <div className="w-full h-[500px] bg-gray-100 rounded-[4rem] overflow-hidden border-8 border-gray-50 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Tech" />
                 </div>
                 <div className="absolute -bottom-8 -left-8 bg-red-600 p-10 rounded-[3rem] shadow-2xl text-white max-w-[280px]">
                    <Quote size={24} className="mb-4 opacity-50" />
                    <p className="text-sm font-black italic tracking-tight uppercase leading-snug">"Innovative matching algorithms for immediate impact."</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-40 bg-gray-900 text-white relative">
        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 w-[80%] h-[80%] pointer-events-none" />
        <div className="container mx-auto px-8 max-w-7xl relative z-10">
           <div className="text-center mb-24">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 italic uppercase">Visual <span className="text-red-600 font-normal not-italic">Sync</span></h2>
              <p className="text-gray-500 font-black text-xs uppercase tracking-[0.4em]">Witness the impact of a global movement.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {galleryItems.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -20 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 shadow-3xl bg-gray-800 p-2">
                    <img src={item.image} className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                  </div>
                  <div className="mt-8 px-4">
                    <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{item.category}</span>
                    <h4 className="text-2xl font-black italic group-hover:text-red-600 transition-colors uppercase tracking-tight">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-white">
        <div className="container mx-auto px-8 max-w-6xl">
           <div className="flex flex-col lg:flex-row gap-24">
              <div className="lg:w-2/5 space-y-12">
                 <div>
                    <h2 className="text-6xl font-black tracking-tighter mb-4 text-gray-900 uppercase">DIRECT <br /><span className="text-red-600 italic">LIAISON</span></h2>
                    <p className="text-sm font-bold text-gray-400 italic">Connecting partners with precision communication.</p>
                 </div>
                 <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-gray-100"><MapPin size={20} /></div>
                       <span className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none">SRM IST, Kattankulathur, Chennai</span>
                    </div>
                    <div className="flex items-center space-x-6">
                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm border border-gray-100"><Clock size={20} /></div>
                       <span className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none italic">Mon - Fri: 0900 - 1700 HRS</span>
                    </div>
                    <div className="flex items-center space-x-6 pt-6 border-t border-gray-50">
                       {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                         <Icon key={i} className="text-gray-300 hover:text-red-600 cursor-pointer transition-colors" size={20} />
                       ))}
                    </div>
                 </div>
              </div>

              <div className="flex-1 bg-gray-50 p-12 lg:p-16 rounded-[4rem] border border-gray-100 shadow-sm">
                 <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
                          <input 
                            name="name" 
                            required 
                            placeholder="Full Name" 
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-red-600 outline-none font-bold text-xs"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Email</label>
                          <input 
                            name="email" 
                            required 
                            placeholder="j.doe@medical.org" 
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-transparent focus:border-red-600 outline-none font-bold text-xs"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Protocol Details</label>
                       <textarea 
                        name="message" 
                        required 
                        rows={5} 
                        placeholder="Detailed message..." 
                        className="w-full px-6 py-4 rounded-3xl bg-white border border-transparent focus:border-red-600 outline-none font-bold text-xs resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                       />
                    </div>
                    <button 
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full py-5 bg-red-600 text-white rounded-3xl font-black text-[10px] tracking-widest uppercase shadow-xl shadow-red-600/20 hover:scale-[1.02] transition-all"
                    >
                      {submitStatus === 'loading' ? 'Relaying...' : 'Dispatch Message'}
                    </button>
                    {submitStatus === 'success' && <p className="text-[10px] font-black text-red-600 uppercase tracking-widest text-center mt-4 italic">Message dispatched successfully.</p>}
                 </form>
              </div>
           </div>
        </div>
      </section>

      {/* Light-box Gallery Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/98 backdrop-blur-xl flex items-center justify-center z-[200] p-8 cursor-zoom-out shadow-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl relative">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage.image}
                className="w-full h-auto rounded-[3rem] border-4 border-white/5"
              />
              <button 
                className="absolute -top-12 right-0 text-white hover:text-red-600 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={40} />
              </button>
              <div className="mt-8 text-white">
                <h4 className="text-3xl font-black uppercase italic italic">{selectedImage.title}</h4>
                <p className="text-gray-400 font-bold mt-2">Certified Clinical Process #{selectedImage.id}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

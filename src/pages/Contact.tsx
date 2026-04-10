import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, HelpCircle, HeartHandshake, Stethoscope } from 'lucide-react';
import api from '../api/axios';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="bg-[#fcfafa] min-h-screen py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-red-50 rounded-full blur-[100px] opacity-30" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-gray-900 tracking-tight mb-6"
          >
            Direct <span className="text-red-600">Liaison</span>
          </motion.h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
            Connecting institutional partners, donors, and recipients with precision communication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/50">
              <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Clinical Headquarters</h2>
              <div className="space-y-6">
                <ContactDetail icon={<MapPin size={20} />} label="Location" text="SRM IST, Kattankulathur, Chennai, TN" />
                <ContactDetail icon={<Phone size={20} />} label="Clinical Hotline" text="+91 44 2745 5510" />
                <ContactDetail icon={<Mail size={20} />} label="Secured Relay" text="info@bloodsync.org" />
                <ContactDetail icon={<Clock size={20} />} label="Ops Hours" text="Mon - Fri: 0900 - 1700 HRS" />
              </div>

              <div className="mt-12 pt-10 border-t border-gray-50">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Digital Presence</h3>
                <div className="flex space-x-4">
                  <SocialBtn icon={<Facebook size={20} />} />
                  <SocialBtn icon={<Twitter size={20} />} />
                  <SocialBtn icon={<Instagram size={20} />} />
                  <SocialBtn icon={<Linkedin size={20} />} />
                </div>
              </div>
            </div>

            <div className="bg-red-600 p-10 rounded-[2.5rem] shadow-xl text-white">
                <h3 className="text-lg font-black tracking-tight mb-2">Emergency Response Unit</h3>
                <p className="text-white/70 text-xs font-semibold mb-6">For immediate critical care logistics assistance:</p>
                <p className="text-3xl font-black">+91 800 123 4567</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50"
          >
            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Encrypted Messaging</h2>
            <p className="text-gray-500 text-xs font-semibold mb-10 leading-relaxed">
              Initialize a secure communication thread for inquiries, feedback, or institutional support.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Identity</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-semibold text-sm" required />
                </div>
                <div className="group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Secure Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="name@org.com" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-semibold text-sm" required />
                </div>
              </div>
              <div className="group">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Context</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of inquiry" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-semibold text-sm" required />
              </div>
              <div className="group">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Protocol Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Detailed message..." rows={4} className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-semibold text-sm resize-none" required />
              </div>
              
              <button
                type="submit"
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl hover:bg-black transition-all disabled:opacity-50"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? 'Encrypting...' : 'Dispatch Message'}
              </button>
            </form>
            {submitStatus === 'success' && <p className="mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest text-center italic">Message successfully relayed.</p>}
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="mt-24 rounded-[3rem] overflow-hidden shadow-2xl border border-white">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.040704806372!2d80.0421958!3d12.8230831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b82a78d9%3A0xfdb944a3aee53831!2sSRM%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1655280323588!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                title="SRM IST"
            />
        </div>
      </div>
    </div>
  );
};

const ContactDetail: React.FC<{ icon: React.ReactNode; label: string; text: string }> = ({ icon, label, text }) => (
  <div className="flex items-start space-x-5 group">
    <div className="bg-red-50 p-3 rounded-2xl text-red-600 transition-all group-hover:bg-red-600 group-hover:text-white">
        {icon}
    </div>
    <div>
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</h4>
        <p className="text-gray-900 font-bold tracking-tight text-sm">{text}</p>
    </div>
  </div>
);

const SocialBtn: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
    {icon}
  </button>
);

export default Contact;

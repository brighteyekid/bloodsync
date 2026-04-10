import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Droplets, Calendar, MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import api from '../api/axios';

interface RequestFormData {
  name: string, email: string, phone: string, location: string, bloodType: string, unitsNeeded: string, dateNeeded: string, urgency: string, additionalInfo: string;
}

const RequestBlood: React.FC = () => {
  const [formData, setFormData] = useState<RequestFormData>({
    name: '', email: '', phone: '', location: '', bloodType: '', unitsNeeded: '', dateNeeded: '', urgency: 'medium', additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const res = await api.get('/api/auth/current_user');
        if (res.data.status === 'success') {
          const u = res.data.user;
          setFormData(prev => ({
            ...prev,
            name: u.name || '',
            email: u.email || '',
            phone: u.phone || '',
            bloodType: u.blood_type || '',
            location: u.location || ''
          }));
        }
      } catch (e) {
        console.log("No user session found for pre-fill");
      }
    };
    fetchCurrent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/request-blood', {
        fullname: formData.name, email: formData.email, phone_number: formData.phone, location: formData.location, blood_type: formData.bloodType, units_needed: parseInt(formData.unitsNeeded) || 0, date_issued: formData.dateNeeded, urgency: formData.urgency,
      });
      setSubmitMessage({ type: 'success', text: 'Emergency Protocol Initialized. Donors within range are being notified.' });
      setFormData({ name: '', email: '', phone: '', location: '', bloodType: '', unitsNeeded: '', dateNeeded: '', urgency: 'medium', additionalInfo: '' });
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Relay failure. Check network connection and retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfafa] min-h-screen py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-red-50 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-red-100 rounded-full blur-[120px] opacity-20" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Sidebar - Status */}
            <div className="lg:w-1/3 space-y-6">
                <div className="text-left mb-10">
                  <div className="inline-flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full mb-6 shadow-lg shadow-red-600/20">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Priority Override Active</span>
                  </div>
                  <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-6">
                    Critical <br/><span className="text-red-600">Request</span>
                  </h1>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed italic">
                    Initializing a high-priority blood requirement protocol. This will trigger immediate alerts across the clinical donor network.
                  </p>
                </div>

                <div className="p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/50 space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600"><Shield size={20} /></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure Data Relay</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600"><Droplets size={20} /></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory Optimization</span>
                    </div>
                    <p className="text-gray-400 text-[10px] font-bold leading-relaxed border-t border-gray-50 pt-6">Ensure all metrics provided are clinically accurate to prevent dispatch delays.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <motion.div 
                className="lg:w-2/3 bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProtocolInput icon={<User size={20} />} label="Patient/Personnel ID" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Full Legal Name" />
                        <ProtocolInput icon={<Mail size={20} />} label="Secured Relay Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="name@organization.com" />
                        <ProtocolInput icon={<Phone size={20} />} label="Comm Link (Phone)" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+1 000 000 0000" />
                        <ProtocolInput icon={<MapPin size={20} />} label="Geo-Location" name="location" type="text" value={formData.location} onChange={handleChange} required placeholder="Facility Address" />
                        
                        <div className="group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 transition-colors group-focus-within:text-red-600">Vital Blood Type</label>
                            <div className="relative">
                                <Droplets size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-400 transition-colors" />
                                <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full pl-12 pr-5 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-bold text-sm appearance-none" required>
                                    <option value="">Select Type</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 transition-colors group-focus-within:text-red-600">Urgency Level</label>
                            <div className="relative">
                                <AlertTriangle size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-400 transition-colors" />
                                <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full pl-12 pr-5 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-bold text-sm appearance-none" required>
                                    <option value="low">Phase 1: Routine</option>
                                    <option value="medium">Phase 2: Priority</option>
                                    <option value="high">Phase 3: Immediate</option>
                                    <option value="critical">Phase 4: Emergency</option>
                                </select>
                            </div>
                        </div>

                        <ProtocolInput icon={<Droplets size={20} />} label="Quanity Required (Units)" name="unitsNeeded" type="number" value={formData.unitsNeeded} onChange={handleChange} required placeholder="0" />
                        <ProtocolInput icon={<Calendar size={20} />} label="Deployment Date" name="dateNeeded" type="date" value={formData.dateNeeded} onChange={handleChange} required placeholder="" />
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 transition-colors group-focus-within:text-red-600">Mission Parameters (Notes)</label>
                        <div className="relative">
                            <MessageSquare size={20} className="absolute left-5 top-5 text-gray-300 group-focus-within:text-red-400 transition-colors" />
                            <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} placeholder="Additional medical context..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border-transparent border-2 rounded-[2rem] focus:bg-white focus:border-red-600 transition-all outline-none font-bold text-sm resize-none" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xs tracking-widest uppercase shadow-2xl shadow-red-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Relaying Overrride...' : 'Broadcast Emergency Protocol'}
                    </button>

                    <AnimatePresence>
                        {submitMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`p-6 rounded-3xl font-bold flex items-center space-x-4 border ${
                                    submitMessage.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full animate-ping ${submitMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-xs uppercase tracking-tight">{submitMessage.text}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProtocolInput: React.FC<{ icon: React.ReactNode, label: string, name: string, type: string, value: string, onChange: any, required?: boolean, placeholder?: string }> = ({ icon, label, name, type, value, onChange, required, placeholder }) => (
    <div className="group">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 transition-colors group-focus-within:text-red-600">{label}</label>
        <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-400 transition-colors">
                {icon}
            </div>
            <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full pl-12 pr-5 py-4 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 transition-all outline-none font-bold text-sm" />
        </div>
    </div>
);

export default RequestBlood;

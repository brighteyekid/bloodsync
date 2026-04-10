import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Stethoscope, Clock, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, X, Shield, Droplets } from 'lucide-react';
import api from '../api/axios';

const BloodDonate: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-[#fcfafa] min-h-screen">
      <HeroSection onDonateClick={() => setShowForm(true)} />
      <div className="container mx-auto px-4 max-w-6xl -mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <FeatureCard 
                icon={<Shield />}
                title="Clinical Security"
                text="Every donation is processed in a Class-A sterile environment."
            />
            <FeatureCard 
                icon={<Activity />}
                title="Biological Impact"
                text="One unit can stabilize up to three clinical emergency cases."
            />
            <FeatureCard 
                icon={<Clock />}
                title="Logistics Velocity"
                text="Our rapid network reduces transit time by 40% vs standard."
            />
        </div>

        <EligibilitySection />
        <ProcessSection />
        <EnhancedFAQSection />

        <AnimatePresence>
            {showForm && <DonationForm onClose={() => setShowForm(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50 text-center flex flex-col items-center">
        <div className="bg-red-50 p-4 rounded-2xl text-red-600 mb-6 text-2xl">
            {React.cloneElement(icon as React.ReactElement, { size: 32 })}
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-500 text-xs font-semibold leading-relaxed">{text}</p>
    </div>
);

const HeroSection: React.FC<{ onDonateClick: () => void }> = ({ onDonateClick }) => (
  <div className="relative pt-24 pb-48 bg-gray-900 overflow-hidden">
    <img 
        src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&w=1600" 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
    
    <div className="container mx-auto px-4 relative z-10 text-center">
      <motion.h1
        className="text-7xl font-black text-white leading-tight tracking-tighter mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Lend Your <span className="text-red-600">Vitality.</span>
      </motion.h1>
      <motion.p
        className="text-xl text-white/70 max-w-2xl mx-auto font-medium mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Join the clinical vanguard. Your blood is a biological asset that can reverse critical shortages and save lives.
      </motion.p>
      <motion.button
        className="bg-red-600 text-white px-12 py-5 rounded-2xl text-sm font-black tracking-widest uppercase shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onDonateClick}
      >
        Initialize Donation
      </motion.button>
    </div>
  </div>
);

const EligibilitySection: React.FC = () => (
  <section className="py-24">
    <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="md:w-1/2">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-8">Clinical <span className="text-red-600">Eligibility</span></h2>
            <div className="space-y-6">
                <EligibilityItem text="Personnel must be 18–60 years of age." />
                <EligibilityItem text="Minimum physiological body mass: 50kg." />
                <EligibilityItem text="Maintaining optimal general health metrics." />
                <EligibilityItem text="56-day gap since prior donation mission." />
                <EligibilityItem text="Hb levels above the 12.5 g/dL threshold." />
            </div>
        </div>
        <div className="md:w-1/2">
            <div className="p-10 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-xl border border-white/50">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-gray-900 tracking-tight leading-none mb-1">Safety First</h4>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Clinical Protocol V3.0</p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm font-semibold leading-relaxed">Our medical staff conducts a comprehensive rapid-screening to ensure your physiology is prime for donation and your impact is maximum.</p>
            </div>
        </div>
    </div>
  </section>
);

const EligibilityItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center space-x-4">
    <CheckCircle2 size={20} className="text-red-600" />
    <span className="text-gray-700 font-bold tracking-tight">{text}</span>
  </div>
);

const ProcessSection: React.FC = () => (
  <section className="py-24 border-t border-gray-100">
    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-16 text-center">Donation <span className="text-red-600">Protocols</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <ProcessStep number={1} title="Registration" text="Secure identification and medical history assessment." />
      <ProcessStep number={2} title="Screening" text="Vital signs and Hb metrics verification." />
      <ProcessStep number={3} title="Donation" text="Primary collection mission (8–10 minutes)." />
      <ProcessStep number={4} title="Recovery" text="Replenishment and logistics debrief." />
    </div>
  </section>
);

const ProcessStep: React.FC<{ number: number; title: string; text: string }> = ({ number, title, text }) => (
  <div className="text-center group">
    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-3xl font-black mx-auto mb-6 transition-all group-hover:bg-red-600 group-hover:text-white">
      {number}
    </div>
    <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-4">{text}</p>
    <div className="h-0.5 w-8 bg-red-600/20 mx-auto" />
  </div>
);

const EnhancedFAQSection: React.FC = () => {
    const faqs = [
        {
          question: "How often can I donate blood?",
          answer: "Most people can donate whole blood every 56 days (8 weeks). Platelet donors can give more frequently, up to 24 times per year."
        },
        {
          question: "Is donating blood safe?",
          answer: "Yes. All equipment is sterile, single-use, and disposed of immediately. The process is overseen by certified clinical professionals."
        },
        {
          question: "How long does it take?",
          answer: "Allocation of 60 minutes is recommended. The actual collection mission takes less than 10 minutes."
        }
      ];

      return (
        <section className="py-24 border-t border-gray-100">
           <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-16 text-center">Clinical <span className="text-red-600">Intelligence</span></h2>
           <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
           </div>
        </section>
      )
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <button
          className="w-full text-left p-6 md:p-8 focus:outline-none flex justify-between items-center group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-black text-gray-900 tracking-tight flex items-center group-hover:text-red-600 transition-colors">
            <HelpCircle size={24} className="text-red-600 mr-4" />
            {question}
          </span>
          {isOpen ? <ChevronUp size={20} className="text-red-600" /> : <ChevronDown size={20} className="text-red-600" />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-8 pb-8"
            >
              <p className="text-gray-500 font-semibold text-sm leading-relaxed border-t border-gray-50 pt-6">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

const DonationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      bloodType: '',
      lastDonation: ''
    });

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
              bloodType: u.blood_type || ''
            }));
          }
        } catch (e) {
          console.log("No user session found for pre-fill");
        }
      };
      fetchCurrent();
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await api.post('/api/blood-donations', formData);
        alert('Donation mission initialized!');
        onClose();
      } catch (error) {
        alert('Mission failure. Please retry.');
      }
    };
  
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
    >
        <motion.div
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full relative overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* Logo Decor */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-red-50 rounded-full opacity-50" />
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-1">Initialize</h2>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Donation Mission</p>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-600 transition-colors">
                <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">FullName</label>
                <input type="text" id="name" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm" required onChange={handleChange} value={formData.name} />
            </div>
            <div className="group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                <input type="email" id="email" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm" required onChange={handleChange} value={formData.email} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">BloodType</label>
                    <select id="bloodType" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm appearance-none" required onChange={handleChange} value={formData.bloodType}>
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className="group">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">LastDate</label>
                    <input type="date" id="lastDonation" className="w-full px-5 py-3.5 bg-gray-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-red-600 outline-none transition-all font-semibold text-sm" onChange={handleChange} value={formData.lastDonation} />
                </div>
            </div>
            
            <button type="submit" className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-red-600/20 mt-4 hovver:scale-[1.02] active:scale-[0.98] transition-all">
              Initialize Account
            </button>
          </form>
        </motion.div>
      </motion.div>
    );
  };

export default BloodDonate;

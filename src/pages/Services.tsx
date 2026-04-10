import React from 'react';
import { motion } from 'framer-motion';
import { Hospital, Ambulance, Stethoscope, FlaskConical, Activity, BookOpen, CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="bg-[#fcfafa] min-h-screen py-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-red-50 rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-red-100 rounded-full blur-[100px] opacity-40" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-gray-900 tracking-tight mb-6"
          >
            Clinical <span className="text-red-600">Provisions</span>
          </motion.h1>
          <p className="text-gray-500 font-medium max-w-3xl mx-auto italic">
            Expanding the horizons of blood logistics through state-of-the-art facilities and a global network of specialized care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Hospital />}
            title="Sovereign Collection Centers"
            description="Ultra-hygienic facilities providing a sterile environment for premium blood donation, governed by the highest clinical protocols."
          />
          <ServiceCard 
            icon={<Ambulance />}
            title="Rapid Deployment Units"
            description="Mobile clinical hubs capable of establishing secure donation zones in corporate sectors, educational institutes, and community centers."
          />
          <ServiceCard 
            icon={<Stethoscope />}
            title="Diagnostic Screening"
            description="Rigorous multi-stage physiological assessments ensuring every unit of blood meets stringent purity and safety standards."
          />
          <ServiceCard 
            icon={<FlaskConical />}
            title="Molecular Processing"
            description="Advanced laboratory splitting and component optimization, maximizing the utility of every whole blood unit collected."
          />
          <ServiceCard 
            icon={<Activity />}
            title="Strategic Distribution"
            description="A high-velocity logistics network providing 24/7 prioritized delivery of critical blood inventory to acute care facilities."
          />
          <ServiceCard 
            icon={<BookOpen />}
            title="Institutional Education"
            description="Empowering the next generation of donors through high-impact awareness initiatives and clinical certification programs."
          />
        </div>

        <motion.div 
          className="mt-24 p-12 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">Quantum Level Precision</h2>
              <p className="text-gray-500 font-medium text-sm">Our commitment to absolute clinical excellence.</p>
            </div>
            <div className="h-0.5 w-12 bg-red-600/30 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <QualityItem text="Global standardization of all blood banking protocols." />
            <QualityItem text="Continuous AI-driven inventory and health monitoring." />
            <QualityItem text="Next-gen cryostatic storage and transportation." />
            <QualityItem text="Direct-to-clinic secure logistics chain." />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const QualityItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center space-x-4 group">
    <div className="bg-red-50 p-2 rounded-xl text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
      <CheckCircle2 size={16} />
    </div>
    <span className="text-gray-700 font-bold text-sm tracking-tight">{text}</span>
  </div>
);

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/40 flex flex-col items-start transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-3xl text-red-600 mb-8 bg-red-50 p-4 rounded-2xl transition-all duration-500 group-hover:bg-red-600 group-hover:text-white">
      {React.cloneElement(icon as React.ReactElement, { size: 32 })}
    </div>
    <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 text-xs font-semibold leading-relaxed mb-6">{description}</p>
    <div className="mt-auto flex items-center space-x-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-[10px] font-black uppercase tracking-widest">Learn More</span>
      <span className="h-0.5 w-4 bg-red-600" />
    </div>
  </motion.div>
);

export default Services;

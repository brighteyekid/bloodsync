import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Users, Hospital, Award, TrendingUp, CheckCircle2, Quote } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-[#fcfafa] min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-red-50 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-red-100 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full mb-6 border border-red-100/50">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Est. 2020 • Global Network</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-[0.95] tracking-tighter mb-8">
                Pioneering <span className="text-red-600">Vitality.</span>
              </h1>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10 max-w-lg">
                BloodSync Life isn't just a logistics platform. We are a clinical movement dedicated to ensuring no human life is ever lost to blood inventory shortages.
              </p>
              <div className="flex items-center space-x-6">
                <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-red-600/20 hover:shadow-red-600/40 transition-all">Our Mission</button>
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden`}>
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-red-600 flex items-center justify-center text-[10px] font-bold text-white">+50k</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000" 
                    alt="Clinical Tech" 
                    className="w-full h-[600px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 border border-gray-50 max-w-[240px]">
                <Quote className="text-red-600 mb-4 text-2xl" />
                <p className="text-xs font-bold text-gray-800 leading-relaxed italic mb-4">"The connection between a donor and a recipient is the purest form of human solidarity."</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-red-600">— Clinical Board</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Impact */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
                <ImpactStat value="15k+" label="Clinical Vitality Matches" />
                <ImpactStat value="50k+" label="Elite Donor Network" />
                <ImpactStat value="500+" label="Certified Care Centers" />
                <ImpactStat value="99.9%" label="Logistics Precision" />
            </div>

            <div className="flex flex-col md:flex-row gap-20">
                <div className="md:w-1/3">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-6">Our Genetic <br/><span className="text-red-600">Blueprint</span></h2>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">Everything we build is centered around three core clinical pillars: Speed, Safety, and Solidarity.</p>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <BlueprintItem icon={<HeartPulse />} title="Humanity First" text="Cultivating a culture where donation is a standard of citizenship." />
                    <BlueprintItem icon={<Users />} title="Network Scaling" text="Building a global resilience network ready for any emergency." />
                    <BlueprintItem icon={<Hospital />} title="Secure Pipelines" text="Direct-to-clinic secure logistics for critical care units." />
                    <BlueprintItem icon={<TrendingUp />} title="Predictive Analysis" text="Using data to prevent shortages before they happen." />
                </div>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4 text-center">Executive <span className="text-red-600">Command</span></h2>
                  <p className="text-gray-500 font-medium italic">The visionaries behind our clinical evolution.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <TeamCard 
                    name="Aayush Kumar"
                    role="Founder & Chief Executive Officer"
                    image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600"
                    bio="A pioneer in biomedical logistics, Aayush leads our global mission with a focus on human impact and institutional growth."
                />
                <TeamCard 
                    name="Vineet"
                    role="Co-founder & Chief Technology Officer"
                    image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600"
                    bio="A master architect of secure digital ecosystems, Vineet oversees the integration of AI in our donor-matching protocols."
                />
              </div>
          </div>
      </section>
    </div>
  );
};

const ImpactStat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="p-8 rounded-[2rem] bg-[#fcfafa] border border-gray-100 flex flex-col items-center text-center">
        <span className="text-3xl font-black text-red-600 mb-2">{value}</span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</span>
    </div>
);

const BlueprintItem: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="flex space-x-6 group">
        <div className="bg-red-50 p-4 rounded-2xl text-red-600 h-fit transition-all group-hover:bg-red-600 group-hover:text-white">
            {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        <div>
            <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">{title}</h3>
            <p className="text-gray-500 text-xs font-semibold leading-relaxed">{text}</p>
        </div>
    </div>
);

const TeamCard: React.FC<{ name: string; role: string; bio: string; image: string }> = ({ name, role, bio, image }) => (
    <motion.div 
        className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/50 text-center flex flex-col items-center"
        whileHover={{ y: -10 }}
    >
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-50 mb-6 shadow-xl">
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">{name}</h3>
        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-6">{role}</p>
        <p className="text-gray-500 text-xs font-semibold leading-relaxed">{bio}</p>
    </motion.div>
);

export default About;

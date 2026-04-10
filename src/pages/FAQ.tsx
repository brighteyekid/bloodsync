import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Who can donate blood?",
      answer: "Individuals in good health, at least 17 years old, and weighing at least 110 pounds are generally eligible. Our clinical staff conducts rapid-screening to verify your physiological status before donation mission initialization."
    },
    {
      question: "How often can I donate blood?",
      answer: "Whole blood collection protocol allows for a 56-day gap between missions (8 weeks). Platelet and plasma logistics have different thresholds, which our team will advise during your debrief."
    },
    {
      question: "Is blood donation safe?",
      answer: "Absolute safety is our primary directive. All equipment is sterile, single-use, and disposed of via clinical waste protocols. Post-donation vitals are monitored to ensure human vitality is maintained."
    },
    {
      question: "How long does a blood donation take?",
      answer: "The entire logistics cycle, including registration and recovery, spans roughly 60 minutes. The active collection phase is highly optimized, typically lasting 8–10 minutes."
    }
  ];

  return (
    <div className="bg-[#fcfafa] min-h-screen py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-red-50 rounded-full blur-[100px] opacity-30" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-gray-900 tracking-tight mb-6"
          >
            Clinical <span className="text-red-600">Intelligence</span>
          </motion.h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
            Essential protocols and knowledge regarding our clinical logistics network.
          </p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <FAQCard 
                key={index} 
                item={item} 
                isOpen={openIndex === index} 
                toggle={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQCard: React.FC<{ item: { question: string, answer: string }, isOpen: boolean, toggle: () => void }> = ({ item, isOpen, toggle }) => (
    <motion.div 
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
      <button
        className="w-full text-left p-8 md:p-10 focus:outline-none flex justify-between items-center group"
        onClick={toggle}
      >
        <span className="text-xl font-black text-gray-900 tracking-tight flex items-center group-hover:text-red-600 transition-colors">
          <HelpCircle size={32} className="text-red-600 mr-4" />
          {item.question}
        </span>
        <div className={`p-3 rounded-2xl transition-all ${isOpen ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <p className="px-10 pb-10 text-gray-500 font-semibold text-sm leading-relaxed border-t border-gray-50 pt-8 italic">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
);

export default FAQ;

import React from 'react';
import { Shield, ShieldOff, ClipboardList, ArrowLeftRight, UserCog, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <section className="mb-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50 transition-all hover:shadow-[0_8px_30px_rgb(220,38,38,0.06)]">
    <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center tracking-tight">
      <div className="bg-red-50 p-2 rounded-xl mr-4">{icon}</div>
      <span>{title}</span>
    </h2>
    <div className="text-gray-600 font-medium text-sm leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

const Privacy: React.FC = () => {
  return (
    <div className="bg-[#fcfafa] min-h-screen py-20 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] -z-10 opacity-60" />

      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black mb-6 text-gray-900 tracking-tight"
          >
            Privacy <span className="text-red-600">Policy</span>
          </motion.h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
            At BloodSync Life, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>

        <Section title="Information We Collect" icon={<ClipboardList size={20} className="text-red-600" />}>
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Health information related to blood donation eligibility</li>
            <li>Donation history and appointment information</li>
            <li>Usage data and analytics from our platform</li>
          </ul>
        </Section>

        <Section title="How We Use Your Information" icon={<ArrowLeftRight size={20} className="text-red-600" />}>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our blood donation services</li>
            <li>Process and manage your donations and appointments</li>
            <li>Communicate with you about donations and services</li>
            <li>Ensure the safety and quality of the blood supply</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </Section>

        <Section title="Data Security" icon={<Shield size={20} className="text-red-600" />}>
          <p>We implement robust security measures to protect your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Strict access controls and authentication procedures</li>
            <li>Employee training on data protection practices</li>
          </ul>
        </Section>

        <Section title="Sharing of Information" icon={<ShieldOff size={20} className="text-red-600" />}>
          <p>We do not sell, trade, or rent your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Healthcare providers as necessary for donation processing</li>
            <li>Service providers who assist our operations under NDA</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </Section>

        <Section title="Your Rights" icon={<UserCog size={20} className="text-red-600" />}>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and update your personal information</li>
            <li>Request deletion of your data, subject to legal requirements</li>
            <li>Opt-out of certain data collection</li>
            <li>Receive a copy of your data in a portable format</li>
          </ul>
        </Section>

        <Section title="Contact Us" icon={<Mail size={20} className="text-red-600" />}>
          <p className="mb-6">If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="bg-white/50 backdrop-blur p-8 rounded-3xl border border-gray-100 space-y-4 shadow-sm">
            <p className="flex items-center text-sm font-bold text-gray-700">
              <MapPin size={18} className="text-red-600 mr-4" />
              SRM Institute of Science and Technology, Kattankulathur, Chennai - 603203
            </p>
            <p className="flex items-center text-sm font-bold text-gray-700">
              <Phone size={18} className="text-red-600 mr-4" />
              +91 44 2745 5510
            </p>
            <p className="flex items-center text-sm font-bold text-gray-700">
              <Mail size={18} className="text-red-600 mr-4" />
              privacy@bloodsynclife.org
            </p>
          </div>
        </Section>

        <p className="mt-16 text-[10px] font-black text-gray-300 text-center uppercase tracking-[0.2em]">Last Updated: June 15, 2024</p>
      </div>
    </div>
  );
};

export default Privacy;

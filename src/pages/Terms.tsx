import React from 'react';
import { Handshake, ShieldCheck, UserCog, FileText, Scale, AlertTriangle, Gavel, Globe } from 'lucide-react';
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
    <div className="text-gray-600 leading-relaxed space-y-4 font-medium text-sm">
      {children}
    </div>
  </section>
);

const Terms: React.FC = () => {
  return (
    <div className="bg-[#fcfafa] min-h-screen py-20 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] -z-10 opacity-60" />

      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black mb-6 text-gray-900 tracking-tight"
          >
            Terms of <span className="text-red-600">Service</span>
          </motion.h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
            Please read these terms carefully before using our services. Your use of BloodSync Life constitutes acceptance of these terms.
          </p>
        </div>

        <Section title="1. Acceptance of Terms" icon={<Handshake size={20} className="text-red-600" />}>
          <p>
            By accessing or using BloodSync Life's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, our Privacy Policy, and any other applicable laws and regulations.
          </p>
          <p>
            If you do not agree with any part of these terms, you may not use our services.
          </p>
        </Section>

        <Section title="2. Use of Service" icon={<ShieldCheck size={20} className="text-red-600" />}>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using the service in any way that violates any applicable local, state, national, or international law or regulation</li>
            <li>Impersonating or attempting to impersonate BloodSync Life, its employees, or other users</li>
            <li>Interfering with or disrupting the service or servers or networks connected to the service</li>
            <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity</li>
          </ul>
        </Section>

        <Section title="3. User Accounts" icon={<UserCog size={20} className="text-red-600" />}>
          <p>
            To access certain features of our service, you may be required to create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your account credentials confidential</li>
            <li>Be solely responsible for all activities that occur under your account</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, false, or outdated.
          </p>
        </Section>

        <Section title="4. Privacy and Data Protection" icon={<FileText size={20} className="text-red-600" />}>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you agree to our Privacy Policy.
          </p>
          <p>
            We comply with all applicable data protection laws and regulations, including the General Data Protection Regulation (GDPR) where applicable.
          </p>
        </Section>

        <Section title="5. Intellectual Property" icon={<Scale size={20} className="text-red-600" />}>
          <p>
            The content, features, and functionality of BloodSync Life, including but not limited to text, graphics, logos, images, and software, are owned by or licensed to BloodSync Life and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or publicly perform any of the material on our website without our prior written consent.
          </p>
        </Section>

        <Section title="6. Limitation of Liability" icon={<AlertTriangle size={20} className="text-red-600" />}>
          <p>
            To the fullest extent permitted by applicable law, BloodSync Life shall not be liable for any indirect, incidental, special, or punitive damages resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use, or alteration of your transmissions</li>
          </ul>
        </Section>

        <Section title="7. Governing Law" icon={<Gavel size={20} className="text-red-600" />}>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising out of or relating to these Terms shall be instituted in the courts of Chennai, Tamil Nadu, India.
          </p>
        </Section>

        <Section title="8. Changes to Terms" icon={<Globe size={20} className="text-red-600" />}>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </Section>

        <p className="mt-16 text-[10px] font-black text-gray-300 text-center uppercase tracking-[0.2em]">Last Updated: June 15, 2024</p>
      </div>
    </div>
  );
};

export default Terms;

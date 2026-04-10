import React from 'react';
import { Calendar, Stethoscope, Smartphone, Handshake, Award } from 'lucide-react';

interface NewsItem {
  title: string;
  date: string;
  summary: string;
  content: string;
  icon: React.ReactNode;
}

const News: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      title: "BloodSync Life Launches Revolutionary Mobile App",
      date: "June 15, 2023",
      summary: "Streamlining blood donation process with cutting-edge technology",
      content: "We're thrilled to announce the launch of our state-of-the-art mobile app, designed to revolutionize the blood donation experience.",
      icon: <Smartphone size={24} />
    },
    {
      title: "Record-Breaking Blood Drive at State University",
      date: "May 28, 2023",
      summary: "Campus event collects over 500 units of blood, setting regional record",
      content: "Our recent blood drive at State University has set a new benchmark for campus blood drives in our region.",
      icon: <Award size={24} />
    },
    {
      title: "BloodSync Life Expands Partnerships with Local Hospitals",
      date: "May 10, 2023",
      summary: "New collaborations to enhance blood supply chain efficiency",
      content: "We're excited to announce new strategic partnerships with five leading hospitals in our region.",
      icon: <Handshake size={24} />
    },
    {
      title: "Innovative Plasma Therapy Shows Promise in COVID-19 Treatment",
      date: "April 22, 2023",
      summary: "BloodSync Life contributes to groundbreaking medical research",
      content: "Recent clinical trials have shown promising results in using convalescent plasma therapy for treating severe cases of COVID-19.",
      icon: <Stethoscope size={24} />
    },
  ];

  return (
    <div className="bg-[#fcfafa] min-h-screen py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-900 tracking-tight mb-6">
            Clinical <span className="text-red-600">Updates</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto italic">
            Monitoring the pulse of our network and the impact of our clinical logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-500 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-red-50 p-3 rounded-2xl text-red-600">
                    {item.icon}
                  </div>
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full">
                    <Calendar size={12} className="mr-2 text-red-300" />
                    {item.date}
                  </div>
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-3 tracking-tight leading-tight">{item.title}</h2>
                <p className="text-gray-500 text-xs font-semibold mb-6 leading-relaxed">{item.content}</p>
                <div className="flex items-center space-x-2">
                  <span className="h-0.5 w-4 bg-red-600/30" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter hover:underline cursor-pointer">Read Full Report</span>
                </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

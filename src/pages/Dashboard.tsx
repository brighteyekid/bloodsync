import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  History, 
  Award, 
  Settings, 
  Plus, 
  Heart, 
  ShieldCheck, 
  Droplets,
  Calendar,
  CheckCircle2,
  ChevronRight,
  User,
  Bell,
  Activity
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import api from '../api/axios';

const Dashboard: React.FC = () => {
  const { user, stats } = useOutletContext<any>();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/auth/current_user');
        if (response.data.status === 'success') {
          setHistory(response.data.history);
        }
      } catch (error) {
        console.error('Error fetching dashboard history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12">
      <div className="px-4 lg:px-12 py-10 max-w-7xl mx-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-4">Vitality Balance</p>
              <div className="flex items-baseline space-x-4">
                <h2 className="text-7xl font-black text-gray-900 tracking-tighter leading-none">{stats?.points || 0}</h2>
                <span className="text-xl font-black text-gray-300 uppercase italic tracking-tighter">PTS</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="bg-gray-50 px-6 py-3 rounded-2xl text-[10px] font-black text-gray-500 uppercase flex items-center space-x-2">
                <Plus size={12} className="text-red-600" />
                <span>+100 per pint</span>
              </div>
              <div className="bg-gray-50 px-6 py-3 rounded-2xl text-[10px] font-black text-gray-500 uppercase flex items-center space-x-2">
                <Activity size={12} className="text-red-600" />
                <span>Referral Active</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-600 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-red-600/30"
          >
            <Activity className="absolute bottom-[-20%] right-[-10%] w-40 h-40 text-black/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-4">Community Impact</p>
            <h2 className="text-7xl font-black tracking-tighter leading-none mb-2">{(stats?.donations || 0) * 3}</h2>
            <h3 className="text-xl font-black italic tracking-tight mb-6">Lives Saved</h3>
            <p className="text-xs font-medium text-white/80 leading-relaxed italic max-w-xs">
              Your {user.blood_type || 'O-'} donations have supported {stats?.donations || 0} critical surgeries so far.
            </p>
          </motion.div>
        </div>

        {/* Content Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-lg font-black text-gray-900 tracing-tight uppercase">Donor Tier Progress</h4>
              <span className="px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest italic">
                {(stats?.donations || 0) >= 5 ? 'Elite Gold' : 'Elite Silver'}
              </span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">
                  Progress to {(stats?.donations || 0) >= 5 ? 'Platinum' : 'Gold'} Donor
                </p>
                <div className="text-sm font-black text-gray-900">{stats?.donations || 0} / 6 Donations</div>
              </div>
              <div className="h-4 bg-gray-50 rounded-full overflow-hidden p-1 border border-gray-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(((stats?.donations || 0) / 6) * 100, 100)}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Activity size={12} />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    {Math.max(6 - (stats?.donations || 0), 0)} more donations needed
                  </span>
                </div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Next Reward: 250 Bonus Pts</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm grid grid-cols-2 gap-4"
          >
            <div className="bg-gray-50 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm text-red-600 border border-gray-100">
                <Heart size={18} />
              </div>
              <div className="text-2xl font-black text-gray-900 leading-none mb-1">{stats?.donations || 0}</div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Total Units</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm text-gray-400 border border-gray-100">
                <Calendar size={18} />
              </div>
              <div className="text-2xl font-black text-gray-900 leading-none mb-1">{stats?.requests || 0}</div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Requests</p>
            </div>
          </motion.div>
        </div>

        {/* Rewards & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm"
           >
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                <h4 className="text-2xl font-black text-gray-900 tracing-tight uppercase">Rewards Marketplace</h4>
              </div>
              
              <div className="bg-gray-50 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center border border-gray-100 group transition-all hover:bg-white hover:shadow-xl">
                 <div className="w-full md:w-64 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1606326666490-457351a6441b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Certificate" 
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
                 </div>
                 <div className="flex-grow space-y-4">
                    <h5 className="text-xl font-black text-gray-900 tracking-tight leading-tight uppercase italic">Claim a Certified <br />Blood Donor Certificate</h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed italic pr-4">
                       Receive an officially sealed digital and physical certificate recognizing your contributions to the national blood supply. High-fidelity print quality with QR verification.
                    </p>
                    <div className="flex items-center space-x-6 pt-2">
                       <button className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 hover:scale-105 transition-all">
                          Claim Reward
                       </button>
                       <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-gray-300 line-through tracking-tighter">750</span>
                          <span className="text-xs font-black text-red-600 tracking-tighter">500 PTS</span>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm"
           >
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-lg font-black text-gray-900 tracing-tight uppercase">Timeline</h4>
                <button className="text-[9px] font-black text-gray-300 uppercase tracking-widest hover:text-red-600 transition-colors">View All</button>
              </div>

              <div className="space-y-8 relative max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-50" />
                {history.length > 0 ? history.map((item, i) => (
                  <div key={i} className="flex space-x-6 relative z-10">
                    <div className={`w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center ${item.isRequest ? 'text-gray-400' : 'text-red-600'} shadow-sm`}>
                      {item.isRequest ? <Activity size={18} /> : <Droplets size={18} />}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{item.date}</span>
                       <h5 className="text-sm font-black text-gray-900 tracking-tight leading-tight mb-1">{item.title}</h5>
                       <p className="text-[10px] font-bold text-gray-400 capitalize mb-2 italic">{item.location}</p>
                       <span className={`px-3 py-1 ${item.isRequest ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-600'} text-[8px] font-black rounded-full uppercase tracking-tighter w-fit`}>
                         {item.points}
                       </span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <p className="text-xs font-black text-gray-300 uppercase tracking-widest italic">No activity recorded</p>
                  </div>
                )}
              </div>
           </motion.div>
        </div>

        {/* Action Bar Floating (Mobile) */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] lg:hidden z-50">
           <button className="w-full py-5 bg-red-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-red-600/30">
              Schedule Donation
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

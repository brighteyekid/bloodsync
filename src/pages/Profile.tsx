import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Heart, ShieldCheck, Award, Settings, Edit3, Save, X, Phone, Droplet, CheckCircle2, Activity } from 'lucide-react';
import api from '../api/axios';

const Profile: React.FC = () => {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    location: '',
    blood_type: '',
    picture: ''
  });

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/auth/current_user');
      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);
        setStats(response.data.stats);
        setHistory(response.data.history || []);
        setEditForm({
          name: userData.name || '',
          phone: userData.phone || '',
          location: userData.location || '',
          blood_type: userData.blood_type || '',
          picture: userData.picture || ''
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put('/api/auth/profile/update', editForm);
      if (response.status === 200) {
        setUser(response.data.user);
        setIsEditing(false);
        fetchProfile(); // Refresh stats/completion
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfafa]">
      <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  const completionColor = stats?.completion < 50 ? 'text-red-500' : stats?.completion < 100 ? 'text-orange-500' : 'text-green-500';

  return (
    <div className="bg-[#fcfafa] min-h-screen py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-red-50/50 -z-10 rounded-bl-[10rem] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-red-100/30 -z-10 rounded-tr-[10rem] blur-2xl" />

      {/* Profile Completion Fixed Widget */}
      <div className="fixed top-24 right-8 z-[90] hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl border border-white flex items-center space-x-4"
        >
          <div className="relative w-14 h-14">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeDasharray="100, 100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (stats?.completion || 0) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={completionColor}
                strokeDasharray="100, 100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-black ${completionColor}`}>
              {stats?.completion}%
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Status</p>
            <h4 className="text-xs font-black text-gray-900 uppercase">
              {stats?.completion === 100 ? 'Verified Profile' : 'Incomplete'}
            </h4>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-white sticky top-32">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="relative mb-6 mx-auto w-32 h-32">
                    <div className="w-full h-full bg-gray-50 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200">
                      {editForm.picture ? (
                        <img src={editForm.picture} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-gray-300" />
                      )}
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-xs font-bold outline-none focus:ring-2 ring-red-100"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-xs font-bold outline-none focus:ring-2 ring-red-100"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="Location"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-xs font-bold outline-none focus:ring-2 ring-red-100"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  />
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-xs font-bold outline-none focus:ring-2 ring-red-100"
                    value={editForm.blood_type}
                    onChange={(e) => setEditForm({...editForm, blood_type: e.target.value})}
                  >
                    <option value="">Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2">
                       <Save size={14} /> <span>Save</span>
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-3 bg-gray-100 text-gray-600 rounded-xl">
                       <X size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="relative mb-8 mx-auto w-40 h-40">
                    <div className="absolute inset-0 bg-red-100 rounded-[2.5rem] rotate-6" />
                    <div className="absolute inset-0 bg-white rounded-[2.5rem] border-2 border-red-50 overflow-hidden relative z-10 p-2">
                       {user?.picture ? (
                         <img src={user.picture} alt={user.name} className="w-full h-full object-cover rounded-[2rem]" onError={(e) => {
                            (e.target as any).src = `https://ui-avatars.com/api/?name=${user.name}&background=random`;
                         }} />
                       ) : (
                         <div className="w-full h-full bg-red-600 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl">
                           {user?.name?.charAt(0)}
                         </div>
                       )}
                    </div>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="absolute -bottom-2 -right-2 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl z-20 hover:bg-red-600 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                  </div>

                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{user?.name}</h2>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 inline-block px-4 py-1.5 rounded-full">
                      {stats?.completion === 100 ? 'Verified Professional' : 'Basic Member'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-gray-500">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-red-600"><Mail size={16} /></div>
                        <span className="text-xs font-bold truncate">{user?.email}</span>
                    </div>
                    {user?.phone && (
                      <div className="flex items-center space-x-4 text-gray-500">
                          <div className="p-2.5 bg-gray-50 rounded-xl text-red-600"><Phone size={16} /></div>
                          <span className="text-xs font-bold">{user.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-gray-500">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-red-600"><MapPin size={16} /></div>
                        <span className="text-xs font-bold">{user?.location || 'Location Not Set'}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-red-600"><Calendar size={16} /></div>
                        <span className="text-xs font-bold">Joined {user?.joined_at ? new Date(user.joined_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="flex-grow space-y-10">
            {/* Header / Actual Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                   <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase italic">VITAL <span className="text-red-600 font-normal not-italic tracking-normal">HUB</span></h1>
                   <p className="text-sm font-bold text-gray-400">Total institutional impact metrics.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-gray-50 p-6 rounded-[2rem] flex flex-col items-center min-w-[110px] border border-transparent hover:border-red-100 hover:bg-white transition-all">
                        <div className="mb-2 text-red-600"><Heart size={18} /></div>
                        <div className="text-xl font-black text-gray-900">{stats?.donations || 0}</div>
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Donations</div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-[2rem] flex flex-col items-center min-w-[110px] border border-transparent hover:border-red-100 hover:bg-white transition-all">
                        <div className="mb-2 text-gray-400"><Phone size={18} /></div>
                        <div className="text-xl font-black text-gray-900">{stats?.requests || 0}</div>
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Requests</div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-[2rem] flex flex-col items-center min-w-[110px] border border-transparent hover:border-red-100 hover:bg-white transition-all">
                        <div className="mb-2 text-red-900"><Droplet size={18} /></div>
                        <div className="text-xl font-black text-gray-900 uppercase">{user?.blood_type || 'N/A'}</div>
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Blood Type</div>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Update Prompt (Always visible if incomplete) */}
            {stats?.completion < 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] p-10 text-white relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="space-y-2">
                      <h3 className="text-xl font-black tracking-tight italic">COMPLETE YOUR <span className="text-red-600">PROFILE</span></h3>
                      <p className="text-xs text-white/50 font-bold max-w-sm italic">Verification requires 100% completion. Update your blood type and contact details to access full privileges.</p>
                   </div>
                   <button 
                    onClick={() => setIsEditing(true)}
                    className="px-8 py-4 bg-white text-gray-900 rounded-full font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-red-600 hover:text-white transition-all"
                   >
                     Update Now
                   </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-0" />
              </motion.div>
            )}

            {/* History Logs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-white"
            >
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Activity Logs</h2>
                 <div className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-gray-900" />
                    <span className="text-[10px] font-black text-gray-300 uppercase italic">Immutable Clinical Logs</span>
                 </div>
              </div>

              {history.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="bg-gray-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Droplet className="text-gray-200" size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-400">No organizational activity recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-8 relative">
                   <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-50" />
                   {history.map((item, i) => (
                      <div key={i} className="flex gap-8 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl ${item.isRequest ? 'bg-gray-900' : 'bg-red-600'} flex items-center justify-center text-white shadow-lg`}>
                           {item.isRequest ? <Activity size={20} /> : <Droplet size={20} />}
                        </div>
                        <div className="flex-grow pt-1">
                           <div className="flex justify-between items-start">
                              <h4 className="text-lg font-black text-gray-900 leading-none">{item.title}</h4>
                              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item.date}</span>
                           </div>
                           <p className="text-sm font-medium text-gray-400 mt-2 italic">{item.location}</p>
                           <div className="mt-3">
                              <span className={`px-3 py-1 ${item.isRequest ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-600'} text-[8px] font-black rounded-full uppercase tracking-tighter w-fit`}>
                                {item.points}
                              </span>
                           </div>
                        </div>
                      </div>
                   ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

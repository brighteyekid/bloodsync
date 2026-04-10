import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  Award, 
  Settings, 
  Heart, 
  ShieldCheck, 
  LogOut,
  Droplets,
  PlusCircle,
  Stethoscope,
  Activity
} from 'lucide-react';

interface SidebarProps {
  user: any;
  stats: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user, stats }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
    window.location.reload(); // Ensure state is cleared
  };

  const menuGroups = [
    {
      title: "Core",
      links: [
        { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'history', name: 'Activity History', path: '/dashboard', icon: <History size={20} /> },
      ]
    },
    {
      title: "Services",
      links: [
        { id: 'donate', name: 'Donate Blood', path: '/blood-donate', icon: <PlusCircle size={20} /> },
        { id: 'request', name: 'Request Blood', path: '/request-blood', icon: <Droplets size={20} /> },
        { id: 'services', name: 'Clinical Services', path: '/services', icon: <Stethoscope size={20} /> },
      ]
    },
    {
      title: "Settings",
      links: [
        { id: 'rewards', name: 'Rewards', path: '/dashboard', icon: <Award size={20} /> },
        { id: 'settings', name: 'Institutional Settings', path: '/dashboard', icon: <Settings size={20} /> },
      ]
    }
  ];

  const profileStats = [
    { label: 'Donations', value: stats?.donations || 0, icon: <Heart size={14} className="text-red-600" /> },
    { label: 'Group', value: user?.blood_type || 'N/A', icon: <ShieldCheck size={14} className="text-gray-400" /> },
    { label: 'Rank', value: (stats?.donations || 0) >= 5 ? 'Gold' : 'Silver', icon: <Award size={14} className="text-red-900" /> },
  ];

  return (
    <aside className="w-80 hidden lg:flex flex-col bg-white border-r border-gray-100 h-screen sticky top-0 overflow-hidden">
      {/* Brand Header */}
      <div className="p-8 pb-4">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/20">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900">
            BLOOD<span className="text-red-600 italic">SYNC</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        {/* User Quick Switcher */}
        <div className="flex items-center space-x-4 mb-8 bg-gray-50 p-4 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md">
            {user?.name?.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="overflow-hidden">
            <h3 className="font-black text-gray-900 leading-none truncate text-sm">{user?.name}</h3>
            <p className="text-[9px] font-black text-red-600 uppercase tracking-widest mt-1">
               Elite {(stats?.donations || 0) >= 5 ? 'Gold' : 'Silver'} Tier
            </p>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-8">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4 ml-2">{group.title}</h4>
              <div className="space-y-1">
                {group.links.map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    className={`flex items-center space-x-4 p-3.5 rounded-2xl transition-all duration-300 font-bold text-xs ${
                      location.pathname === link.path 
                        ? 'bg-red-50 text-red-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile & Logout - Footer of Sidebar */}
      <div className="p-6 border-t border-gray-50 bg-gray-50/50">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {profileStats.map((stat, i) => (
            <div key={i} className="bg-white p-2 rounded-xl border border-gray-100 flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-900">{stat.value}</span>
              <span className="text-[6px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
           <Link 
            to={`/user/${user?.name?.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center space-x-3 group"
           >
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white shadow-sm transition-transform group-hover:scale-105">
                {user?.picture ? (
                  <img src={user.picture} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div>
                <h4 className="text-[10px] font-black text-gray-900 group-hover:text-red-600 transition-colors">Profile</h4>
                <p className="text-[8px] font-bold text-gray-400 leading-none">View Account</p>
              </div>
           </Link>
           <button 
             onClick={handleLogout}
             className="p-2.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
           >
             <LogOut size={18} />
           </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

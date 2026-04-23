import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { 
  Users as UsersIcon, 
  UserCheck, 
  Shield, 
  UserX, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  ShieldCheck 
} from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [userRes, deptRes] = await Promise.all([
        api.get('/users'),
        api.get('/departments')
      ]);
      setUsers(userRes.data);
      setDepartments(deptRes.data);
    } catch (error) {
      console.error('Error fetching users/deps:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Users', value: users.length, icon: UsersIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Officers', value: users.filter(u => u.role === 'officer').length, icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Citizens', value: users.filter(u => u.role === 'citizen').length, icon: UserCheck, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="animate-in fade-in duration-500 text-white pb-12">
      
      <PageHeader 
        title="Users Management"
        subtitle="Manage user accounts, roles, and permissions"
        searchPlaceholder="Search users by name..."
      />

      {/* Top Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        {statCards.map((stat, i) => (
          <div 
            key={i} 
            className="backdrop-blur-xl rounded-[32px] border flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px' }}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6`} style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
               <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <p className="font-medium text-lg mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.title}</p>
            <h3 className="text-white text-5xl font-black">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="backdrop-blur-xl rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '16px', marginBottom: '40px' }}>
        <div className="relative flex-1 max-w-[500px] w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="w-full bg-black/20 border-none rounded-full py-4 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="bg-black/20 border border-white/10 rounded-full py-4 px-8 text-white/70 outline-none appearance-none cursor-pointer font-bold hover:bg-black/40 transition-colors">
            <option className="bg-gray-900 text-white">All Roles</option>
            <option className="bg-gray-900 text-white">Admin</option>
            <option className="bg-gray-900 text-white">Officer</option>
            <option className="bg-gray-900 text-white">Citizen</option>
          </select>
          <button className="flex items-center gap-2 bg-black/20 border border-white/10 hover:bg-black/40 text-white/70 px-8 py-4 rounded-full transition-all font-bold">
            <Filter className="w-5 h-5" />
            <span>More Filters</span>
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white px-8 py-4 rounded-full font-bold shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all">
            <Plus className="w-6 h-6" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        {users.map((u, i) => (
          <div 
            key={u._id} 
            className="backdrop-blur-xl rounded-[32px] border flex flex-col transition-all hover:bg-white/5 hover:-translate-y-1 group"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '32px' }}
          >
            
            <div className="flex justify-between items-start mb-8 relative">
              <div className="flex gap-6 items-center">
                <div className={`w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-md ${i%2===0 ? 'bg-blue-600' : 'bg-purple-600'}`}>
                  {u.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-2xl">{u.name}</h3>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <p className="font-medium text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>USR-{u._id.substring(u._id.length-4).toUpperCase()}</p>
                  
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                    u.role === 'officer' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-white/10 text-white/70'
                  }`}>
                    <Shield className="w-3.5 h-3.5" />
                    {u.role}
                  </div>
                </div>
              </div>
              
              <button className="text-white/30 hover:text-white/70 transition-colors">
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-400" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-purple-400" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-medium">{u.department?.name || 'Unassigned'}</span>
              </div>
            </div>

          </div>
        ))}

        {users.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-[32px]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
             <p className="font-bold text-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>No underlying users found.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Users;

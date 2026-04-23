import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { 
  FileText, 
  Hourglass, 
  Activity, 
  CheckCircle, 
  Plus, 
  UserPlus 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [distribution, setDistribution] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics');
        setStats(data.overview);
        setDistribution(data.statusDistribution || []);
        setMonthly(data.monthlyComplaints || []);
        setRecent(data.recentComplaints || []);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Complaints', value: stats?.total || 0, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/20', trend: 'Total' },
    { title: 'Pending', value: stats?.pending || 0, icon: Hourglass, color: 'text-yellow-400', bg: 'bg-yellow-400/20', trend: 'Awaiting' },
    { title: 'In Progress', value: stats?.inProgress || 0, icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/20', trend: 'Active' },
    { title: 'Resolved', value: stats?.resolved || 0, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20', trend: 'Closed' }
  ];

  const COLORS = ['#60a5fa', '#fbbf24', '#c084fc', '#34d399', '#f87171'];

  return (
    <div className="animate-in fade-in duration-500 text-white pb-12">
      
      <PageHeader 
        title="System Overview"
        subtitle="Welcome back! Here's what's happening today."
        showSearch={false}
      />
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="backdrop-blur-xl rounded-[32px] border relative overflow-hidden transition-all duration-300"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px' }}
          >
            <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold ${stat.bg} ${stat.color}`}>
              {stat.trend}
            </div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6`} style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.title}</p>
              <h3 className="text-4xl font-black">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Left Column (Charts) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', gridColumn: 'span 2' }}>
          <div className="backdrop-blur-xl rounded-[32px] border" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px' }}>
            <h3 className="text-2xl font-bold mb-2">Weekly Trends</h3>
            <p className="text-base text-white/50 mb-10">Complaints vs Resolutions</p>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly}>
                  <defs>
                    <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c084fc" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#c084fc" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                  <Tooltip contentStyle={{backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px', color: '#fff'}} />
                  <Area type="monotone" dataKey="complaints" stroke="#c084fc" strokeWidth={3} fillOpacity={1} fill="url(#colorComplaints)" />
                  <Area type="monotone" dataKey="resolved" stroke="#34d399" strokeWidth={3} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Link 
            to="/admin/assign"
            className="block h-full group"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-10 border border-white/10 flex flex-col items-center justify-center text-center transition-all hover:bg-white/20 hover:border-white/20 h-full">
              <div className="w-20 h-20 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserPlus className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold mb-2">Assign Complaints</h4>
              <p className="text-sm text-white/50">Allocate staff and resources</p>
            </div>
          </Link>
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-10 border border-white/10">
            <h3 className="text-2xl font-bold mb-2">Status Distribution</h3>
            <p className="text-base text-white/50 mb-6">Complaint breakdown</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px', color: '#fff'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {distribution.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-white/80">{entry.name}</span>
                  </div>
                  <span className="font-bold">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-10 border border-white/10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Recent</h3>
              <button className="text-base text-purple-400 hover:text-purple-300">View All</button>
            </div>
            <div className="space-y-6">
              {recent.map((c) => (
                <div key={c._id} className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-bold text-white/50">{c.complaintId || `#${c._id.substring(c._id.length - 4)}`}</span>
                    <span className={`text-[12px] uppercase font-bold px-3 py-1.5 rounded-full ${
                      c.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                      c.status === 'In Progress' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm mb-1 truncate">{c.title}</h4>
                  <div className="flex justify-between text-xs text-white/50">
                    <span>{c.department?.name || 'Unassigned'}</span>
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {recent.length === 0 && <p className="text-sm text-white/50 text-center py-4">No recent complaints.</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;

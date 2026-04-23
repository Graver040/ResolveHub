import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { 
  BarChart2, 
  TrendingUp, 
  Calendar, 
  Download 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#F43F5E'];

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Fallbacks for UI if data isn't ready, but mostly using API data
  const monthlyData = data?.monthlyComplaints?.length > 0 ? data.monthlyComplaints : [];
  const distributionData = data?.categoryDistribution?.length > 0 ? data.categoryDistribution : [];

  const overview = data?.overview || {};
  const totalComplaintsNum = overview.total || 0;
  
  const statCards = [
    { title: 'Total Complaints', value: totalComplaintsNum.toLocaleString(), icon: BarChart2, colorClass: 'bg-blue-500', trend: '+12%', subtext: 'Updated live' },
    { title: 'Resolution Rate', value: `${overview.resolutionRate || 0}%`, icon: TrendingUp, colorClass: 'bg-green-500', trend: '+8%', subtext: 'Actual database stats' },
    { title: 'Avg Response Time', value: overview.avgResponseTime || 'N/A', icon: Calendar, colorClass: 'bg-purple-500', trend: '-18%', subtext: 'System average' },
    { title: 'Satisfaction Score', value: overview.satisfactionScore || 'N/A', icon: TrendingUp, colorClass: 'bg-orange-500', trend: '+15%', subtext: 'Based on feedback' }
  ];

  return (
    <div className="animate-in fade-in duration-500 text-white pb-12">
      
      <PageHeader 
        title="Analytics & Reports"
        subtitle="Comprehensive insights and performance metrics"
        showSearch={false}
      />
      
      {/* 4 Colored Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.colorClass} rounded-[32px] shadow-xl flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1`} style={{ padding: '40px' }}>
            {/* Top row: Icon + trend pill */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm font-bold text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <TrendingUp className="w-4 h-4" />
                {stat.trend}
              </div>
            </div>
            
            <p className="font-medium text-lg mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{stat.title}</p>
            <h3 className="text-white text-5xl font-black mb-2">{stat.value}</h3>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        
        {/* Monthly Trends - Bar Chart */}
        <div className="backdrop-blur-xl rounded-[32px] border" style={{ gridColumn: 'span 2', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '32px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-1 text-white">Monthly Trends</h3>
              <p className="font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Complaints vs Resolutions</p>
            </div>
            <button className="flex items-center gap-2 border border-white/10 hover:bg-white/10 text-white/70 px-5 py-2.5 rounded-full transition-colors font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)"/>
                <XAxis dataKey="name" axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 14}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontWeight: 500}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', color: '#fff', fontWeight: 'bold' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="complaints" fill="#f59e0b" radius={[8, 8, 8, 8]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* By Category - Donut Chart */}
        <div className="backdrop-blur-xl rounded-[32px] border" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '32px' }}>
          <h3 className="text-2xl font-bold mb-1 text-white">By Category</h3>
          <p className="font-medium mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>Complaint distribution</p>
          
          <div className="h-[250px] mb-8 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', color: '#fff', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {distributionData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{entry.name}</span>
                </div>
                <span className="font-bold text-white">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;

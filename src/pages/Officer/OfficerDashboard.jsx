import { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

const OfficerDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/complaints');
        setStats({
          total: data.length,
          pending: data.filter(c => c.status === 'Pending').length,
          inProgress: data.filter(c => c.status === 'In Progress').length,
          resolved: data.filter(c => c.status === 'Resolved').length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'My Total Cases', value: stats.total, icon: FileText, colorClass: 'text-blue-500' },
    { title: 'Pending Pickup', value: stats.pending, icon: Clock, colorClass: 'text-yellow-500' },
    { title: 'Active Processing', value: stats.inProgress, icon: AlertTriangle, colorClass: 'text-indigo-500' },
    { title: 'Cases Resolved', value: stats.resolved, icon: CheckCircle2, colorClass: 'text-emerald-500' },
  ];

  if (loading) return null;

  return (
    <div className="animate-in fade-in duration-500 text-white">
      <div style={{ marginBottom: '40px' }}>
        <h1 className="text-6xl font-black tracking-tight mb-4">Dashboard</h1>
        <p className="text-xl font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Quick overview of your workload and performance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        {statCards.map((stat, i) => (
          <div 
            key={i} 
            className="backdrop-blur-xl rounded-[32px] border flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px' }}
          >
            <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <stat.icon className={`w-7 h-7 ${stat.colorClass}`} />
              </div>
            </div>
            <p className="font-medium text-lg mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.title}</p>
            <h3 className="text-white text-5xl font-black">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerDashboard;

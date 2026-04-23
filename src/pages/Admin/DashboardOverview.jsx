import { useState, useEffect } from 'react';
import { 
  FileText, 
  Hourglass, 
  Activity, 
  CheckCircle, 
  Calendar, 
  Building 
} from 'lucide-react';
import api from '../../services/api';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analytics');
        setStats(data.overview);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Complaints', value: stats?.total || 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending', value: stats?.pending || 0, icon: Hourglass, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'In Progress', value: stats?.inProgress || 0, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Resolved', value: stats?.resolved || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Complaints Today', value: stats?.complaintsToday || 0, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Most Active Dept', value: stats?.mostActiveDept || 'N/A', icon: Building, color: 'text-rose-600', bg: 'bg-rose-100' }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">System Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-center gap-4"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;

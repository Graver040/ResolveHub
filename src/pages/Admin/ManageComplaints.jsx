import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { 
  FileText, 
  Clock, 
  Activity, 
  CheckCircle, 
  Search, 
  Filter, 
  Download, 
  Plus 
} from 'lucide-react';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaints');
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/complaints/${id}`, { status: newStatus });
      await api.post(`/complaints/${id}/updates`, { 
        message: `Status updated to ${newStatus} by Administration.`,
        statusChange: newStatus 
      });
      fetchComplaints(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total', value: complaints.length, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/20' },
    { title: 'Pending', value: complaints.filter(c => c.status==='Pending').length, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    { title: 'In Progress', value: complaints.filter(c => c.status==='In Progress').length, icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/20' },
    { title: 'Resolved', value: complaints.filter(c => c.status==='Resolved').length, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' }
  ];

  return (
    <div className="animate-in fade-in duration-500 text-white pb-12">
      <PageHeader 
        title="Manage Complaints"
        subtitle="View, filter, and manage all complaint submissions"
        searchPlaceholder="Search complaints..."
      />
      {/* Enhanced Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        {statCards.map((s, i) => (
          <div 
            key={i} 
            className="backdrop-blur-xl rounded-[24px] border flex flex-col relative overflow-hidden transition-all duration-300 hover:bg-white-[0.15]"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px' }}
          >
            <span className="text-white/60 font-medium tracking-wider mb-2" style={{ fontSize: '14px' }}>{s.title}</span>
            <div className="flex items-center justify-between" style={{ marginTop: 'auto' }}>
              <span className="text-4xl font-extrabold">{s.value}</span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-xl rounded-[32px] border overflow-hidden pb-4" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest bg-black/10">
                <th className="p-6">Complaint ID</th>
                <th className="p-6">Title & Description</th>
                <th className="p-6">Department</th>
                <th className="p-6">Status</th>
                <th className="p-6">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {complaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-white/50 text-lg">No complaints found.</td>
                </tr>
              )}
              {complaints.map((c) => (
                <tr key={c._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-bold">{c.complaintId || `#${c._id.substring(c._id.length-4)}`}</td>
                  <td className="p-6">
                    <p className="font-bold mb-1">{c.title}</p>
                    <p className="text-white/50 text-xs line-clamp-1 max-w-[200px]">{c.description}</p>
                  </td>
                  <td className="p-6 text-white/80">{c.department?.name || '-'}</td>
                  <td className="p-6">
                    <select 
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide cursor-pointer outline-none appearance-none bg-black/20 ${
                        c.status === 'Resolved' ? 'text-green-400 border border-green-500/30' :
                        c.status === 'In Progress' ? 'text-purple-400 border border-purple-500/30' :
                        'text-yellow-400 border border-yellow-500/30'
                      }`}
                      value={c.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    >
                      <option value="Pending" className="bg-gray-900 text-yellow-400">Pending</option>
                      <option value="In Progress" className="bg-gray-900 text-purple-400">In Progress</option>
                      <option value="Resolved" className="bg-gray-900 text-green-400">Resolved</option>
                    </select>
                  </td>
                  <td className="p-6">
                    {c.assignedOfficer ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold shadow-md">
                          {c.assignedOfficer.name.substring(0,2).toUpperCase()}
                        </div>
                        <span className="text-white/80 font-medium">{c.assignedOfficer.name}</span>
                      </div>
                    ) : (
                      <span className="text-white/40 italic">Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageComplaints;

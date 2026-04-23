import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { 
  Clock, 
  AlertTriangle, 
  Users, 
  CheckCircle, 
  Search, 
  Filter, 
  Check 
} from 'lucide-react';

const AssignComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);
  
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [compRes, offRes, anaRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/users/officers/all'),
        api.get('/analytics')
      ]);
      setComplaints(compRes.data.filter(c => c.status !== 'Resolved' && !c.assignedOfficer));
      setOfficers(offRes.data);
      setStats(anaRes.data.overview);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const statCards = [
    { title: 'Unassigned', value: complaints.length, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    { title: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-400/20' },
    { title: 'Available Staff', value: officers.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/20' },
    { title: 'Assigned Today', value: stats?.assignedToday || 0, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' }
  ];

  const [assignLoading, setAssignLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedComplaint || !selectedOfficer) return;
    
    setAssignLoading(true);
    try {
      await api.put(`/complaints/${selectedComplaint._id}`, {
        assignedOfficer: selectedOfficer._id,
        status: 'In Progress'
      });
      
      await api.post(`/complaints/${selectedComplaint._id}/updates`, {
        message: 'Your complaint has been assigned to a department and an officer is actively working on it.',
        statusChange: 'In Progress'
      });
      
      setSelectedComplaint(null);
      setSelectedOfficer(null);
      fetchData();
    } catch (error) {
      console.error('Error assigning:', error);
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 text-white pb-12">
      <PageHeader 
        title="Assign Complaints"
        subtitle="Assign unresolved complaints to team members"
        showSearch={false}
      />

      {/* Stats row */}
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Left Column: Unassigned Complaints */}
        <div className="backdrop-blur-xl rounded-[32px] border flex flex-col" style={{ gridColumn: 'span 2', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px', height: '700px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '32px' }}>
            <div>
              <h3 className="text-xl font-bold">Unassigned Complaints</h3>
              <p className="text-sm text-white/50">Select a complaint to assign</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input type="text" placeholder="Search..." className="bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white outline-none w-[200px]" />
              </div>
              <button className="bg-black/20 border border-white/10 p-2.5 rounded-full hover:bg-black/40"><Filter className="w-4 h-4 text-white/70" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
            {complaints.length === 0 && <p className="text-white/50 py-10 text-center">No unassigned complaints found.</p>}
            {complaints.map(c => (
              <div 
                key={c._id} 
                onClick={() => setSelectedComplaint(c)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${selectedComplaint?._id === c._id ? 'bg-white/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white/50">{c.complaintId || `#${c._id.substring(c._id.length-4)}`}</span>
                  </div>
                  {selectedComplaint?._id === c._id && <CheckCircle className="w-5 h-5 text-purple-400" />}
                </div>
                <h4 className="font-bold text-lg mb-1">{c.title}</h4>
                <p className="text-sm text-white/50 line-clamp-1 mb-4">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="px-3 py-1 rounded-full bg-black/20">{c.department?.name || 'Any'}</span>
                  <span>By {c.citizen?.name}</span>
                  <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Team Members */}
        <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-10 border border-white/10 h-[700px] flex flex-col">
          <h3 className="text-2xl font-bold mb-2">Team Members</h3>
          <p className="text-base text-white/50 mb-8">Select an assignee</p>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
             {officers.map(o => (
              <div 
                key={o._id} 
                onClick={() => setSelectedOfficer(o)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedOfficer?._id === o._id ? 'bg-white/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold shadow-md">
                      {o.name.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-none mb-1">{o.name}</h4>
                      <p className="text-xs text-white/40 leading-none">{o.department?.name || 'General Staff'}</p>
                    </div>
                  </div>
                  {selectedOfficer?._id === o._id && <CheckCircle className="w-5 h-5 text-purple-400" />}
                </div>
                
                <div className="flex items-center justify-between text-xs font-semibold px-1">
                   <div className="flex items-center gap-1.5 text-green-400">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></span>
                     Available
                   </div>
                   <span className="text-white/40">Active: {o.activeTasks || 0} tasks</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 mt-4 border-t border-white/10">
            <button 
              onClick={handleAssign}
              disabled={assignLoading || !selectedComplaint || !selectedOfficer}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none"
            >
              {assignLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Assign Task</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AssignComplaints;

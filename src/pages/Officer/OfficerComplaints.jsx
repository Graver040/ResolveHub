import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { 
  Filter, 
  Clock, 
  User, 
  Building2, 
  Calendar, 
  PlayCircle, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const OfficerComplaints = () => {
  const location = useLocation();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const isResolvedView = location.pathname.includes('/resolved');

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

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.post(`/complaints/${id}/updates`, { 
        message: `Officer changed status to ${newStatus}`,
        statusChange: newStatus 
      });
      fetchComplaints();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (isResolvedView) return c.status === 'Resolved';
    if (filter === 'All') return c.status !== 'Resolved';
    return c.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 text-white pb-12">
      
      <PageHeader 
        title={isResolvedView ? 'Resolved Cases' : 'My Assigned Complaints'}
        subtitle={isResolvedView ? 'Viewing successfully closed cases' : 'View and process complaints assigned to you'}
        searchPlaceholder="Search assigned cases..."
      />

      {/* Filter Bar (Only shown on active complaints) */}
      {!isResolvedView && (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', borderRadius: '32px', padding: '32px', marginBottom: '48px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {['All', 'Pending', 'In Progress'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{ 
                  padding: '12px 32px', 
                  borderRadius: '12px', 
                  fontWeight: 'bold', 
                  transition: 'all 0.3s', 
                  backgroundColor: (filter === 'All' && t === 'All') || filter === t ? 'rgba(255,255,255,0.1)' : 'transparent', 
                  color: (filter === 'All' && t === 'All') || filter === t ? '#fff' : 'rgba(255,255,255,0.4)',
                  boxShadow: (filter === 'All' && t === 'All') || filter === t ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                {t === 'All' ? 'All Active' : t}
              </button>
            ))}
          </div>

          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '16px 32px', borderRadius: '9999px', fontWeight: 'bold' }}>
            <Filter className="w-5 h-5" />
            <span>More Filters</span>
          </button>
        </div>
      )}

      {/* Complaints Grid */}
      <div className="space-y-8">
        {filteredComplaints.map((item) => (
          <div key={item._id} className="group transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', borderRadius: '32px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
            
            {/* Top Row: Meta Info & Chips */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
              <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-blue-400">
                <span>{item.complaintId || 'CMP-NULL'}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
                  item.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                  item.status === 'In Progress' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-green-500/20 text-green-400'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  {item.status}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h2 className="text-4xl font-black mb-4 leading-tight group-hover:text-blue-200 transition-colors">
              {item.title}
            </h2>
            <p className="text-white/60 text-xl font-medium mb-10 max-w-5xl leading-relaxed">
              {item.description}
            </p>

            {/* Meta Data Grid (Bottom Row) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              <div className="rounded-3xl p-6 border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-blue-400" style={{ backgroundColor: 'rgba(59,130,246,0.2)' }}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Submitted By</p>
                    <p className="font-bold text-lg">{item.citizen?.name || 'Anonymous'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl p-6 border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-cyan-400" style={{ backgroundColor: 'rgba(6,182,212,0.2)' }}>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Created</p>
                    <p className="font-bold text-lg">{new Date(item.createdAt).toLocaleDateString()}</p>
                    <p className="text-[10px] font-bold uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl p-6 border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-blue-400" style={{ backgroundColor: 'rgba(59,130,246,0.2)' }}>
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Due Date</p>
                    <p className="font-bold text-lg">
                      {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            {!isResolvedView && (
              <div className="flex flex-wrap pt-10 border-t border-white/10" style={{ gap: '16px' }}>
                <button 
                  onClick={() => handleUpdateStatus(item._id, 'In Progress')}
                  disabled={item.status === 'In Progress' || item.status === 'Resolved'}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl transition-all disabled:opacity-30 disabled:grayscale"
                >
                  <PlayCircle className="w-6 h-6" />
                  <span>Start Processing</span>
                </button>
                
                <button 
                  onClick={() => handleUpdateStatus(item._id, 'Resolved')}
                  disabled={item.status === 'Resolved'}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-5 rounded-2xl shadow-xl transition-all disabled:opacity-30 disabled:grayscale"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Mark as Resolved</span>
                </button>

                <button className="px-10 flex items-center justify-center gap-3 border text-white font-bold py-5 rounded-2xl transition-all" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <MessageSquare className="w-6 h-6" />
                  <span>Add Comment</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredComplaints.length === 0 && (
          <div style={{ padding: '120px 40px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', marginTop: '32px' }}>
             <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '900', fontSize: '32px', marginBottom: '16px' }}>
               {isResolvedView ? 'No resolved cases found.' : 'No assigned complaints found.'}
             </p>
             <p style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
               {isResolvedView ? 'Complete tasks to see them here' : 'Everything is up to date'}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerComplaints;

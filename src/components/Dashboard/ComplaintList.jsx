import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { Plus, Search, Filter } from 'lucide-react';

const ComplaintList = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const { data } = await api.get('/complaints');
                setComplaints(data);
            } catch (err) {
                console.error("Failed to fetch complaints list", err);
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div className="animate-in fade-in duration-500">
            {/* Control Bar */}
            <div 
                className="backdrop-blur-xl rounded-[32px] shadow-xl border flex flex-col md:flex-row items-center justify-between"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', padding: '24px', marginBottom: '40px', gap: '24px' }}
            >
                <div className="relative flex-1 max-w-[500px] w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input 
                        type="text" 
                        placeholder="Search your complaints..." 
                        className="w-full border rounded-full text-white outline-none transition-all font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', padding: '16px 24px 16px 56px' }}
                    />
                </div>
                <div className="flex w-full md:w-auto" style={{ gap: '16px' }}>
                    <button 
                        className="flex items-center text-white rounded-full transition-all font-bold"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 32px', gap: '8px' }}
                    >
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </button>
                    <button 
                        onClick={() => navigate('/raise-complaint')} 
                        className="flex items-center text-white rounded-full font-bold transition-all bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400"
                        style={{ padding: '16px 32px', gap: '8px', boxShadow: '0 4px 15px rgba(236,72,153,0.3)' }}
                    >
                        <Plus className="w-6 h-6" />
                        <span>File Complaint</span>
                    </button>
                </div>
            </div>

            {/* Complaints List as Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                {complaints.map((c) => (
                    <div 
                        key={c._id} 
                        className="backdrop-blur-xl rounded-[2rem] shadow-xl flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 border"
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: '32px' }}
                    >
                        <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
                            <span className="text-white/30 font-bold text-sm tracking-widest uppercase">#{c._id.substring(c._id.length - 6)}</span>
                            <div className={`rounded-full text-xs font-bold uppercase tracking-wider ${
                                c.status === 'Resolved' ? 'text-green-400' :
                                c.status === 'In Progress' ? 'text-purple-400' :
                                'text-yellow-400'
                            }`}
                            style={{ 
                                backgroundColor: c.status === 'Resolved' ? 'rgba(34,197,94,0.1)' : c.status === 'In Progress' ? 'rgba(168,85,247,0.1)' : 'rgba(234,179,8,0.1)', 
                                padding: '6px 12px' 
                            }}>
                                {c.status}
                            </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white line-clamp-2" style={{ marginBottom: '12px' }}>{c.title}</h3>
                        <p className="text-white/50 font-medium flex-1 line-clamp-3 leading-relaxed" style={{ marginBottom: '24px' }}>{c.description || 'No description provided.'}</p>
                        
                        <div className="flex justify-between items-center" style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <div>
                                <p className="text-white/30 text-xs font-bold uppercase tracking-wider" style={{ marginBottom: '4px' }}>Date</p>
                                <p className="text-white/80 font-bold">{new Date(c.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button className="text-pink-500 font-bold hover:text-pink-400 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}

                {complaints.length === 0 && (
                    <div className="col-span-full text-center border backdrop-blur-xl rounded-[2rem]" style={{ padding: '48px', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' }}>
                        <p className="text-white/40 font-bold text-xl">No complaints filed yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintList;
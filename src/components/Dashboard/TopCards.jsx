import { useState, useEffect } from "react";
import api from "../../services/api";
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const TopCards = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        resolved: 0,
        inProgress: 0
    });

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const { data } = await api.get('/complaints');
                setStats({
                    total: data.length,
                    pending: data.filter(c => c.status === 'Pending').length,
                    resolved: data.filter(c => c.status === 'Resolved').length,
                    inProgress: data.filter(c => c.status === 'In Progress').length,
                });
            } catch (err) {
                console.error("Failed to fetch complaints for TopCards", err);
            }
        };
        fetchRecent();
    }, []);

    const statCards = [
        { title: 'My Complaints', value: stats.total, icon: FileText, colorTheme: { border: 'rgba(59,130,246,0.5)', bg: 'rgba(59,130,246,0.1)', text: '#3b82f6' } },
        { title: 'Pending', value: stats.pending, icon: Clock, colorTheme: { border: 'rgba(234,179,8,0.5)', bg: 'rgba(234,179,8,0.1)', text: '#eab308' } },
        { title: 'In Progress', value: stats.inProgress, icon: AlertCircle, colorTheme: { border: 'rgba(168,85,247,0.5)', bg: 'rgba(168,85,247,0.1)', text: '#a855f7' } },
        { title: 'Resolved', value: stats.resolved, icon: CheckCircle, colorTheme: { border: 'rgba(16,185,129,0.5)', bg: 'rgba(16,185,129,0.1)', text: '#10b981' } }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {statCards.map((stat, index) => (
                <div 
                    key={index} 
                    className="backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden transition-all hover:-translate-y-1"
                    style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '32px' }}
                >
                    <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
                        <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner"
                            style={{ backgroundColor: stat.colorTheme.bg, border: `1px solid ${stat.colorTheme.border}` }}
                        >
                            <stat.icon className="w-7 h-7" style={{ color: stat.colorTheme.text }} />
                        </div>
                    </div>
                    <p className="font-medium text-lg" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{stat.title}</p>
                    <h3 className="text-white text-5xl font-black">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default TopCards;
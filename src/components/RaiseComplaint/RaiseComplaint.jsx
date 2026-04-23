import React, { useState } from 'react';
import api from '../../services/api';
import Sidebar from '../Dashboard/Sidebar';
import PageHeader from '../PageHeader';
import { MapPin, Image as ImageIcon, Send } from 'lucide-react';

const RaiseComplaint = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/complaints', { title, category, description });
            alert("Complaint Submitted Successfully!");
            setTitle("");
            setCategory("");
            setDescription("");
        } catch (error) {
            console.error(error);
            alert("Failed to submit complaint.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen text-white font-sans relative overflow-hidden" style={{ backgroundColor: '#050505' }}>
            {/* Background Glows */}
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <Sidebar />

            <div className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 w-full">
                <main className="p-12 max-w-[1200px] mx-auto min-h-screen" style={{ padding: '48px' }}>
                    <div className="animate-in fade-in duration-500 text-white pb-12" style={{ paddingBottom: '48px' }}>
                        
                        <div style={{ marginBottom: '48px' }}>
                            <PageHeader 
                              title="File a Complaint"
                              subtitle="Provide details about your issue so we can help resolve it quickly."
                              showSearch={false}
                            />
                        </div>

                        <div className="backdrop-blur-xl rounded-[32px] p-10 shadow-xl border relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', padding: '40px' }}>
                            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col" style={{ gap: '32px' }}>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                                    <div className="flex flex-col" style={{ gap: '12px' }}>
                                        <label className="block text-sm font-bold text-white/70 uppercase tracking-wide">Complaint Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="E.g., Broken Streetlight" 
                                            value={title} 
                                            onChange={e=>setTitle(e.target.value)} 
                                            required 
                                            className="w-full border rounded-2xl text-white outline-none transition-all font-medium"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', padding: '16px 24px' }}
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col" style={{ gap: '12px' }}>
                                        <label className="block text-sm font-bold text-white/70 uppercase tracking-wide">Category</label>
                                        <select 
                                            required 
                                            value={category} 
                                            onChange={e=>setCategory(e.target.value)}
                                            className="w-full border rounded-2xl text-white outline-none transition-all font-medium appearance-none"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', padding: '16px 24px' }}
                                        >
                                            <option value="" className="bg-[#0f1115] text-white">Select Category</option>
                                            <option value="Roads" className="bg-[#0f1115] text-white">Roads & Transport</option>
                                            <option value="Water" className="bg-[#0f1115] text-white">Water Supply</option>
                                            <option value="Sanitation" className="bg-[#0f1115] text-white">Sanitation & Garbage</option>
                                            <option value="Electrical" className="bg-[#0f1115] text-white">Electrical & Streetlights</option>
                                            <option value="Other" className="bg-[#0f1115] text-white">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col" style={{ gap: '12px' }}>
                                    <label className="block text-sm font-bold text-white/70 uppercase tracking-wide">Description</label>
                                    <textarea 
                                        rows="5" 
                                        placeholder="Describe the issue in detail..." 
                                        value={description} 
                                        onChange={e=>setDescription(e.target.value)} 
                                        required
                                        className="w-full border rounded-2xl text-white outline-none transition-all font-medium resize-none"
                                        style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', padding: '16px 24px' }}
                                    ></textarea>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                                    <div className="flex flex-col" style={{ gap: '12px' }}>
                                        <label className="block text-sm font-bold text-white/70 uppercase tracking-wide">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input 
                                                type="text" 
                                                placeholder="Enter landmark or address" 
                                                required 
                                                className="w-full border rounded-2xl text-white outline-none transition-all font-medium"
                                                style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', padding: '16px 24px 16px 56px' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col" style={{ gap: '12px' }}>
                                        <label className="block text-sm font-bold text-white/70 uppercase tracking-wide">Upload Image <span className="opacity-50">(Optional)</span></label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                className="w-full border rounded-2xl text-white outline-none transition-all font-medium cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pink-500 file:text-white"
                                                style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', padding: '12px 24px 12px 56px' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '24px' }}>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                                        style={{ padding: '20px 40px', gap: '12px' }}
                                    >
                                        {loading ? (
                                            <div className="flex items-center" style={{ gap: '8px' }}>
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Submit Complaint</span>
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RaiseComplaint;

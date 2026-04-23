import Sidebar from "../Dashboard/Sidebar";
import "../Dashboard/Dashboard.css";
import "./RaiseComplaint.css";
import { useState } from "react";
import api from "../../services/api";

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
        <div className="dashboard-layout">
            <header className="dashboard-header">
                <div className="profile-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
            </header>
            
            <div className="dashboard-body">
                <Sidebar />

                <main className="dashboard-main">
                    <div className="form-container">
                        <h2 className="form-title">Raise a New Complaint</h2>
                        <form onSubmit={handleSubmit} className="complaint-form">
                            <div className="form-group">
                                <label>Complaint Title</label>
                                <input type="text" placeholder="E.g., Broken Streetlight" value={title} onChange={e=>setTitle(e.target.value)} required />
                            </div>
                            
                            <div className="form-group">
                                <label>Category</label>
                                <select required value={category} onChange={e=>setCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    <option value="Roads">Roads & Transport</option>
                                    <option value="Water">Water Supply</option>
                                    <option value="Sanitation">Sanitation & Garbage</option>
                                    <option value="Electrical">Electrical & Streetlights</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="4" placeholder="Describe the issue in detail" value={description} onChange={e=>setDescription(e.target.value)} required></textarea>
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" placeholder="Enter landmark or address" required />
                            </div>

                            <div className="form-group">
                                <label>Upload Image (Optional)</label>
                                <input type="file" accept="image/*" />
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Complaint'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RaiseComplaint;

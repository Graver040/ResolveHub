import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

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
        <div className="complaint-list">
            <div className="list-top-bar">
                <h2 className="list-title">All Complaints</h2>
                <div className="list-actions">
                    <button className="new-complaint-btn" onClick={() => navigate('/raise-complaint')}>+ Create New</button>
                </div>
            </div>

            <div className="list-header">
                <span>ID</span>
                <span>Title</span>
                <span>Category</span>
                <span>Date</span>
                <span>Status</span>
                <span>Action</span>
            </div>

            {complaints.length === 0 && <div className="p-4 text-center text-gray-500">No complaints filed yet.</div>}
            {complaints.map((c) => (
                <div key={c._id} className="complaint-row">
                    <span>{c._id.substring(c._id.length - 6).toUpperCase()}</span>
                    <span className="row-title">{c.title}</span>
                    <span>{c.category}</span>
                    <span>{new Date(c.createdAt).toISOString().split('T')[0]}</span>
                    <span className={`status ${c.status.toLowerCase().replace(" ", "-")}`}>
                        {c.status}
                    </span>
                    <button className="view-btn">View Details</button>
                </div>
            ))}
        </div>
    );
};

export default ComplaintList;
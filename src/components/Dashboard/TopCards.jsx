import { useState, useEffect } from "react";
import api from "../../services/api";
import ComplaintCard from "./ComplaintCard";

const TopCards = () => {
    const [recentComplaints, setRecentComplaints] = useState([]);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const { data } = await api.get('/complaints');
                // Slice top 4 for the recent cards
                setRecentComplaints(data.slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch complaints for TopCards", err);
            }
        };
        fetchRecent();
    }, []);

    return (
        <div className="top-cards">
            {recentComplaints.length === 0 && <p className="text-gray-500">No recent complaints.</p>}
            {recentComplaints.map((item, index) => (
                <ComplaintCard key={item._id || index} data={{
                    title: item.title,
                    status: item.status,
                    date: new Date(item.createdAt).toISOString().split('T')[0]
                }} />
            ))}
        </div>
    );
};

export default TopCards;
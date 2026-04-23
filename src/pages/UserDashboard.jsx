import Sidebar from "../components/Dashboard/Sidebar";
import TopCards from "../components/Dashboard/TopCards";
import ComplaintList from "../components/Dashboard/ComplaintList";
import "../components/Dashboard/Dashboard.css";

const UserDashboard = () => {
    return (
        <div className="dashboard-layout">
            {/* Header (Top Navigation) */}
            <header className="dashboard-header">
                <div className="profile-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
            </header>

            <div className="dashboard-body">
                {/* Fixed Left Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <main className="dashboard-main">
                    <TopCards />
                    <ComplaintList />
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
import Sidebar from '../components/Dashboard/Sidebar';
import ComplaintList from '../components/Dashboard/ComplaintList';
import PageHeader from '../components/PageHeader';

const MyComplaints = () => {
    return (
        <div className="flex h-screen text-white font-sans relative overflow-hidden" style={{ backgroundColor: '#050505' }}>
            {/* Background Glows */}
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <Sidebar />

            <div className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 w-full">
                <main className="p-12 max-w-[1800px] mx-auto min-h-screen" style={{ padding: '48px' }}>
                    <div className="animate-in fade-in duration-500 text-white pb-12" style={{ paddingBottom: '48px' }}>
                        
                        <div style={{ marginBottom: '48px' }}>
                            <PageHeader 
                              title="My Complaints"
                              subtitle="Review and track the progress of your submitted complaints."
                              searchPlaceholder="Search your complaints..."
                            />
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                           <ComplaintList />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyComplaints;

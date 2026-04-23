import { Outlet } from 'react-router-dom';
import OfficerSidebar from './OfficerSidebar';
import { Search, Bell, User } from 'lucide-react';

const OfficerLayout = () => {
  return (
    <div className="flex h-screen text-white font-sans relative overflow-hidden" style={{ backgroundColor: '#050505' }}>
      
      {/* Background Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <OfficerSidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 w-full">
        <main className="p-12 max-w-[1800px] mx-auto min-h-screen" style={{ padding: '48px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficerLayout;

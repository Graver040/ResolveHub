import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </header>
        
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

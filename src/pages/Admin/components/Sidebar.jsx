import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardCheck, 
  Building, 
  Users, 
  PieChart, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Manage Complaints', icon: FileText, path: '/admin/complaints' },
    { label: 'Assign Complaints', icon: ClipboardCheck, path: '/admin/assign' },
    { label: 'Departments', icon: Building, path: '/admin/departments' },
    { label: 'Users', icon: Users, path: '/admin/users' },
    { label: 'Analytics', icon: PieChart, path: '/admin/analytics' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl z-20 transition-all duration-300">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-lg">
          R
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Resolve<span className="text-blue-400">Hub</span>
        </h1>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 shadow-lg shadow-blue-500/30 text-white font-medium' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:ml-1'
              }`
            }
          >
            <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110`} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

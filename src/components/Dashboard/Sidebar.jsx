import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FilePlus, FileText, LogOut } from 'lucide-react';
import logoImg from "../../assets/images/logo.png";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Raise Complaint', path: '/raise-complaint', icon: FilePlus },
        { label: 'My Complaints', path: '/my-complaints', icon: FileText },
    ];

    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const userName = userInfo?.name || 'Default User';
    const userEmail = userInfo?.email || 'user@system.com';
    const userInitials = userName.substring(0, 2).toUpperCase();

    return (
        <aside className="border-r border-white/5 text-white flex flex-col relative z-20 h-full backdrop-blur-3xl" style={{ width: '320px', backgroundColor: 'rgba(15, 17, 21, 0.6)', padding: '40px 0 24px 0' }}>
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')} style={{ padding: '0 32px', marginBottom: '48px', gap: '16px' }}>
                <img src={logoImg} alt="ResolveHub Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <div>
                    <h1 className="text-xl font-black tracking-tight">ResolveHub</h1>
                    <p className="text-xs text-white/30 font-bold tracking-widest uppercase">Citizen Portal</p>
                </div>
            </div>

            <nav className="flex-1 flex flex-col" style={{ padding: '0 16px', gap: '8px' }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => 
                                `flex items-center font-bold transition-all duration-300 rounded-xl ${
                                    isActive && item.path !== '#'
                                        ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-pink-500 shadow-inner' 
                                        : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'
                                }`
                            }
                            style={{ padding: '16px 20px', gap: '16px' }}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}

                <div style={{ padding: '24px 0 0 0', marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full font-bold transition-all duration-300 rounded-xl text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                        style={{ padding: '16px 20px', gap: '16px' }}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            <div style={{ padding: '0 16px', marginTop: 'auto' }}>
                <div className="flex items-center rounded-2xl transition-colors cursor-pointer border hover:bg-white/5" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', padding: '16px', gap: '16px' }}>
                    <div className="rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-black shadow-[0_0_15px_rgba(236,72,153,0.3)]" style={{ width: '40px', height: '40px' }}>
                        {userInitials}
                    </div>
                    <div className="overflow-hidden">
                        <h4 className="text-sm font-bold truncate">{userName}</h4>
                        <p className="text-xs text-white/40 font-medium truncate">{userEmail}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
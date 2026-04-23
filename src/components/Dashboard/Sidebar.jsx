import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Raise Complaint", path: "/raise-complaint" },
        { name: "My Complaints", path: "#" },
        { name: "Profile", path: "#" },
        { name: "Logout", path: "/" }
    ];

    return (
        <div className="sidebar">
            {menuItems.map((item, index) => (
                <div 
                    className="sidebar-item" 
                    key={index}
                    onClick={() => {
                        if (item.path !== "#") navigate(item.path);
                    }}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
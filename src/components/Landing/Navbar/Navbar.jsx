import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-wrapper flex justify-center w-full fixed top-6 left-0 right-0 z-50 px-4">
      <nav className="navbar glass w-full px-8 py-3 rounded-2xl flex justify-between items-center border border-white/10" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        
        {/* LOGO */}
        <div className="logo flex items-center gap-3" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={logoImg} alt="ResolveHub Logo" className="w-10 h-10 object-contain" />
          <span className="font-bold text-2xl tracking-tighter text-white">ResolveHub</span>
        </div>

        {/* NAV LINKS */}
        <ul className="nav-links hidden md:flex gap-10 items-center text-sm font-semibold text-white/60">
          <li className="hover:text-pink-500 transition-colors cursor-pointer">Features</li>
          <li className="hover:text-pink-500 transition-colors cursor-pointer">How It Works</li>
          <li className="hover:text-pink-500 transition-colors cursor-pointer">About Us</li>
        </ul>

        {/* LOGIN */}
        <div className="nav-login">
          <button 
            onClick={() => navigate("/login")} 
            className="bg-[#ff0080] text-white px-12 py-3 rounded-full text-sm font-bold shadow-[0_4px_20px_rgba(255,0,128,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            Login / Register
          </button>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
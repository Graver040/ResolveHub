import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-wrapper">

      <nav className="navbar">

        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>RH</div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li>Features</li>
          <li>How it works</li>
          <li>About us</li>
        </ul>

        {/* LOGIN */}
        <div className="nav-login">
          <button onClick={() => navigate("/login")} className="nav-login-button">
            Login / Register
          </button>
        </div>

      </nav>

    </div>
  );
};

export default Navbar;
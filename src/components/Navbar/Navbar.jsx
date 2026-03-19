import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">

      <nav className="navbar">

        {/* LOGO */}
        <div className="logo">RH</div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li>Features</li>
          <li>How it works</li>
          <li>About us</li>
        </ul>

        {/* LOGIN */}
        <div className="login">Login/register</div>

      </nav>

    </div>
  );
};

export default Navbar;
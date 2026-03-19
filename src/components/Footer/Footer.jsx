import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT LOGO */}
        <div className="footer-left">
          <h1 className="footer-logo">RH</h1>
        </div>

        {/* RIGHT CONTENT */}
        <div className="footer-right">

          <h3>CONTACT US:</h3>

          <p>Email: support@civictrack.com</p>
          <p>Phone: +91 XXXXX XXXXX</p>
          <p>Location: India</p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroImage from "../../../assets/images/hero.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-text">

          <h1>
            Report Issues.<br />
            Track Progress.<br />
          </h1>
          <h2>
            Build a Better Community.
          </h2>

          <p>
            CivicTrack is a smart digital platform that enables citizens to
            report public issues, track resolution progress, and ensure
            transparent communication with authorities.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/register')}>Raise a Complaint</button>
            <br />
            <button className="btn-secondary">Learn More</button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img src={heroImage} alt="Dashboard preview" />
        </div>

      </div>

    </section>
  );
};

export default Hero;
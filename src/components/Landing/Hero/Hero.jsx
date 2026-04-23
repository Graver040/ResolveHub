import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Eye } from "lucide-react";
import "./Hero.css";
import heroImg from "../../../assets/images/hero.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-shell">
      <div className="hero-aurora hero-aurora-left" />
      <div className="hero-aurora hero-aurora-right" />

      <div className="hero-frame">
        <div className="hero-grid">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-copy"
          >
            <h1 className="hero-title">
              <span className="hero-title-line hero-title-pink">Report Issues.</span>
              <span className="hero-title-line hero-title-blue">Track Progress.</span>
              <span className="hero-title-line hero-title-pink hero-title-small">
                Build a Better Community.
              </span>
            </h1>

            <p className="hero-description">
              ResolveHub empowers citizens to report civic issues, track their
              resolution in real-time, and build transparent communication with
              local authorities.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="hero-btn hero-btn-primary"
                onClick={() => navigate("/register")}
              >
                <span>Raise a Complaint</span>
                <ArrowRight className="hero-btn-icon" />
              </button>

              <button type="button" className="hero-btn hero-btn-secondary">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-visual"
          >
            <div className="hero-visual-panel">
              <div className="hero-visual-stage overflow-hidden rounded-t-[2rem]">
                <img src={heroImg} alt="Hero App Preview" className="w-full h-full object-cover" />
              </div>

              <div className="hero-side-tag">
                <span className="hero-side-dot" />
                Community collaboration
              </div>

              <div className="hero-feature-stack">
                <div className="hero-feature-card hero-feature-card-pink">
                  <div className="hero-feature-icon hero-feature-icon-pink">
                    <FileText size={30} />
                  </div>
                  <div>
                    <h4>Submit Report</h4>
                    <p>Quick &amp; easy</p>
                  </div>
                </div>

                <div className="hero-feature-card hero-feature-card-blue">
                  <div className="hero-feature-icon hero-feature-icon-blue">
                    <Eye size={30} />
                  </div>
                  <div>
                    <h4>Track Status</h4>
                    <p>Real-time updates</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
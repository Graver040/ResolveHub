import React from "react";
import "./HowItWorks.css";
import ScrollReveal from "../../ReactBits/ScrollReveal";

const HowItWorks = () => {

  const steps = [
    {
      title: "Submit Your Complaint",
      desc: "Enter issue details, select category, upload an image and provide your location."
    },
    {
      title: "Admin Assigns Officer",
      desc: "Your complaint is reviewed and assigned to the relevant department officer."
    },
    {
      title: "Track & Get Resolution",
      desc: "Monitor real-time progress until the issue is successfully resolved."
    }
  ];

  return (
    <section className="how">

      {/* 🔥 TITLE */}
      <ScrollReveal
        containerClassName="how-title"
        textClassName="how-title-text"
      >
        HOW IT WORKS
      </ScrollReveal>

      <div className="how-container">

        {steps.map((step, index) => (
          <div className="how-card" key={index}>

            {/* 🔥 STEP NUMBER */}
            <ScrollReveal
              containerClassName="step-number"
              textClassName="step-number-text"
            >
              {String(index + 1)}
            </ScrollReveal>

            {/* 🔥 STEP TITLE */}
            <ScrollReveal
              containerClassName="step-title"
              textClassName="step-title-text"
            >
              {step.title}
            </ScrollReveal>

            {/* 🔥 STEP DESCRIPTION */}
            <ScrollReveal
              containerClassName="step-desc"
              textClassName="step-desc-text"
            >
              {step.desc}
            </ScrollReveal>

          </div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorks;
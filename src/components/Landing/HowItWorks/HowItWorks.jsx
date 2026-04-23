import React from "react";
import "./HowItWorks.css";
import ScrollReveal from "../../../ReactBits/ScrollReveal";

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
        wordAnimationStart="top bottom-=10%"
        wordAnimationEnd="top bottom-=20%"
      >
        HOW IT WORKS
      </ScrollReveal>

      <div className="how-container">

        {steps.map((step, index) => {
          // Calculate start and end purely using the offset based on index!
          const stepStart = 20 + index * 20; // 20%, 40%, 60%
          const stepEnd = 40 + index * 20;   // 40%, 60%, 80%

          return (
            <div className="how-card" key={index}>

              {/* 🔥 STEP NUMBER */}
              <ScrollReveal
                containerClassName="step-number"
                textClassName="step-number-text"
                wordAnimationStart={`top bottom-=${stepStart}%`}
                wordAnimationEnd={`top bottom-=${stepEnd}%`}
              >
                {String(index + 1)}
              </ScrollReveal>

              {/* 🔥 STEP TITLE */}
              <ScrollReveal
                containerClassName="step-title"
                textClassName="step-title-text"
                wordAnimationStart={`top bottom-=${stepStart}%`}
                wordAnimationEnd={`top bottom-=${stepEnd}%`}
              >
                {step.title}
              </ScrollReveal>

              {/* 🔥 STEP DESCRIPTION */}
              <ScrollReveal
                containerClassName="step-desc"
                textClassName="step-desc-text"
                wordAnimationStart={`top bottom-=${stepStart}%`}
                wordAnimationEnd={`top bottom-=${stepEnd}%`}
              >
                {step.desc}
              </ScrollReveal>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default HowItWorks;
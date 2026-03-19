import TiltedCard from "../TiltedCard/TiltedCard";
import "./Features.css";

const Features = () => {

  const features = [
    {
      title: "Easy Complaint Submission",
      description:
        "Submit issues quickly with category selection, location tagging and image uploads."
    },
    {
      title: "Real-Time Status Tracking",
      description:
        "Track complaint progress from submission to resolution with live updates."
    },
    {
      title: "Transparent Workflow",
      description:
        "Ensure accountability with a clear complaint assignment and resolution system."
    },
    {
      title: "Analytics & Insights",
      description:
        "Use dashboards to analyze complaints, trends and department performance."
    }
  ];

  return (
    <section className="features">

      <div className="features-container">

        {features.map((feature, i) => (
          <TiltedCard
            key={i}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>

    </section>
  );
};

export default Features;
import TiltedCard from "../../../ReactBits/TiltedCard";
import "./Features.css";

const Features = () => {

  const features = [
    {
      title: "Easy Complaint Submission",
      description:
        "Submit issues quickly with category selection, location tagging and image uploads.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=600&auto=format&fit=crop"
    },
    {
      title: "Real-Time Status Tracking",
      description:
        "Track complaint progress from submission to resolution with live updates.",
      image: "https://images.unsplash.com/photo-1507925922837-326f86878b17?q=80&w=600&h=600&auto=format&fit=crop"
    },
    {
      title: "Transparent Workflow",
      description:
        "Ensure accountability with a clear complaint assignment and resolution system.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&h=600&auto=format&fit=crop"
    },
    {
      title: "Analytics & Insights",
      description:
        "Use dashboards to analyze complaints, trends and department performance.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="features">

      <div className="features-container">

        {features.map((feature, i) => (
          <TiltedCard
            key={i}
            imageSrc={feature.image}
            altText={feature.title}
            captionText={feature.title}
            containerHeight="300px"
            containerWidth="280px"
            imageHeight="300px"
            imageWidth="280px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="tilted-card-demo-text">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            }
          />
        ))}

      </div>

    </section>
  );
};

export default Features;
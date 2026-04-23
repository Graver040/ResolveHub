import Navbar from "../components/Landing/Navbar/Navbar";
import Hero from "../components/Landing/Hero/Hero";
import Features from "../components/Landing/Features/Features";
import HowItWorks from "../components/Landing/HowItWorks/HowItWorks";
import Challenges from "../components/Landing/Challenges/Challenges";
import Impact from "../components/Landing/Impact/Impact";
import WhyChoose from "../components/Landing/WhyChoose/WhyChoose";
import Footer from "../components/Landing/Footer/Footer";

const Landing = () => {
  return (
    <div className="landing-page bg-[#050505] min-h-screen overflow-hidden" style={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Challenges />
        <HowItWorks />
        <Impact />
        <WhyChoose />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
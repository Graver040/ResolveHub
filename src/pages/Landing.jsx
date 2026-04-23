import Navbar from "../components/Landing/Navbar/Navbar";
import Hero from "../components/Landing/Hero/Hero";
import Features from "../components/Landing/Features/Features";
import HowItWorks from "../components/Landing/HowItWorks/HowItWorks";
import Footer from "../components/Landing/Footer/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Landing;
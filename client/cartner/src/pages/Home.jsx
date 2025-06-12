import React from "react";
import HeroSection from "../components/Landing/HeroSection";
import Features from "../components/Landing/Features";
import EasierExperience from "../components/Landing/EasierExperience";
import Footer from "../components/Footer";
import Testimonials from "../components/Landing/Testimonials";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <EasierExperience />
      <Testimonials />
    </>
  );
};

export default Home;

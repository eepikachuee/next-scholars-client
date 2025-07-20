import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TopScholarships from "@/components/home/TopScholarships";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <TopScholarships />
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
};

export default Home;

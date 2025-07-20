import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import SuccessStoriesSection from "@/components/home/SuccessStoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TopScholarships from "@/components/home/TopScholarships";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <TopScholarships />
      <TestimonialsSection></TestimonialsSection>
      <SuccessStoriesSection></SuccessStoriesSection>
      <FAQSection></FAQSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;

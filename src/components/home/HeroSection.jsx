// components/HeroSection.jsx
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router";

const banners = [
  {
    id: 1,
    title: "Find Scholarships Worldwide",
    description:
      "Browse thousands of scholarships across different countries and subjects.",
    image: "https://i.ibb.co/8w1P2sv/baim-hanif-p-YWu-OMhtc6k-unsplash.jpg",
  },
  {
    id: 2,
    title: "Apply with Ease",
    description:
      "Apply to your dream university through a seamless and guided application process.",
    image: "https://i.ibb.co/DfRJ2W7Z/graduation-cap-sits-top-stack-books.jpg",
  },
  {
    id: 3,
    title: "Track Your Applications",
    description:
      "Stay updated on your application status and get feedback in real-time.",
    image: "https://i.ibb.co/RG9b52HQ/roger-nobles-Ftn-RSz-OCDTI-unsplash.jpg",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-[90vh]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" />

              <div className="relative z-10 text-center px-6 max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="mb-6 text-lg md:text-xl">{banner.description}</p>
                <Button
                  variant="default"
                  className="text-base px-6 py-3"
                  onClick={() => navigate("/scholarships")}
                >
                  Explore Scholarships
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;

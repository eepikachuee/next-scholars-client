import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fakeReviews = [
  {
    _id: "1",
    userName: "Ayesha Rahman",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    universityName: "University of Toronto",
    rating: 5,
    comment:
      "This platform helped me find the perfect scholarship. The process was smooth and I received my offer in just a few weeks!",
  },
  {
    _id: "2",
    userName: "Rafiul Islam",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    universityName: "University of Melbourne",
    rating: 4,
    comment:
      "NextScholars gave me access to scholarships I didn’t know existed. I’m now studying abroad with 70% funding!",
  },
  {
    _id: "3",
    userName: "Mitu Sarker",
    userImage: "https://randomuser.me/api/portraits/women/65.jpg",
    universityName: "University of Tokyo",
    rating: 5,
    comment:
      "Amazing user experience! Everything from application to feedback was handled professionally. Highly recommend it.",
  },
  {
    _id: "4",
    userName: "Arif Mahmud",
    userImage: "https://randomuser.me/api/portraits/men/51.jpg",
    universityName: "MIT",
    rating: 4,
    comment:
      "At first I wasn’t sure, but the results speak for themselves. Thanks to this platform, I got my dream opportunity!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Students Say
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          //   navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {fakeReviews.map((review) => (
            <SwiperSlide key={review._id}>
              <Card className="shadow-md dark:shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.universityName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-yellow-500 mb-2">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} size={16} fill="#facc15" stroke="none" />
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 italic">
                    “
                    {review.comment.length > 120
                      ? review.comment.slice(0, 120) + "..."
                      : review.comment}
                    ”
                  </p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;

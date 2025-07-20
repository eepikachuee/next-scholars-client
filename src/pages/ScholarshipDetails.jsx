import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  const {
    data: scholarship,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/details/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axiosPublic.get(`/scholarship-reviews/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    getReviews();
  }, [axiosPublic, id]);

  // console.log(reviews);

  if (isLoading) {
    return <Skeleton className="w-full h-96 rounded-xl" />;
  }

  if (isError || !scholarship) {
    return <p className="text-red-500">Failed to load scholarship details.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Card className="rounded-2xl shadow-xl overflow-hidden">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              Posted on: {new Date(scholarship.postDate).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-primary">
              {scholarship.universityName}
            </h2>
            <p className="text-sm text-muted-foreground">
              <strong>Category:</strong> {scholarship.scholarshipCategory}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Subject:</strong> {scholarship.subjectCategory}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Degree:</strong> {scholarship.degree}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Location:</strong> {scholarship.city},{" "}
              {scholarship.country}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Deadline:</strong> {scholarship.deadline}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Application Fees:</strong> ${scholarship.applicationFees}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Service Charge:</strong> ${scholarship.serviceCharge}
            </p>
            {scholarship.stipend && (
              <p className="text-sm text-muted-foreground">
                <strong>Stipend:</strong> {scholarship.stipend}
              </p>
            )}

            <Button
              className="mt-4 w-full"
              onClick={() => navigate(`/checkout/${scholarship._id}`)}
            >
              Apply Scholarship
            </Button>
          </div>
        </CardContent>
      </Card>

      <h4 className="font-bold text-3xl pt-10">Review</h4>

      <div className="pt-5">
        {reviews.length ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Card className=" border  h-full">
                  <CardContent className="p-6 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 my-3">
                        <img
                          src={review.userImage}
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <p className="text-sm ">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-yellow-400 font-semibold">
                        ⭐ {review.rating}
                      </p>
                      <p className="mt-2 italic ">{review.comment}</p>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-muted-foreground">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;

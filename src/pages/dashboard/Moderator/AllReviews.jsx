import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Error loading reviews", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/reviews/${id}`);
        Swal.fire("Deleted!", "Review has been deleted.", "success");
        fetchReviews();
      } catch {
        Swal.fire("Error!", "Failed to delete review.", "error");
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review._id} className="shadow-md p-4 flex flex-col">
            <CardContent>
              <h3 className="text-lg font-semibold mb-1">
                🎓 {review.universityName}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                Subject:{" "}
                <span className="font-medium">{review.subjectCategory}</span>
              </p>
              <div className="flex items-center gap-3 mt-2 mb-2">
                <img
                  src={review.userImage}
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-yellow-500 font-semibold">
                ⭐ {review.rating}
              </p>
              <p className="mt-2 italic text-gray-800">{review.comment}</p>
              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={() => handleDelete(review._id)}
              >
                Delete Review
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;

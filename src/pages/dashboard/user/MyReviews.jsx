import { useState, useContext } from "react";
import { AuthContext } from "@/providers/AuthContext";
import Swal from "sweetalert2";
import EditReviewModal from "@/components/modal/EditReviewModal";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   console.log(reviews);

  //
  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    enabled: !!user?.email && !!localStorage.getItem("token"),
    queryKey: ["reviewsUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
  });

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const res = await axiosSecure.get(`/reviews/user/${user.email}`);
  //       setReviews(res.data);
  //     } catch (error) {
  //       console.error("Error fetching reviews", error);
  //     }
  //   };

  //   fetchReviews();
  // }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        // fetchReviews();
        refetch();
      } catch {
        Swal.fire("Error!", "Failed to delete review.", "error");
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    document.activeElement?.blur(); // remove focus to avoid aria-hidden conflict
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="p-6 text-red-500">Failed to load users</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 border">University</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="p-2 border">{review.universityName}</td>
                <td className="p-2 border">{review.comment}</td>
                <td className="p-2 border">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setIsModalOpen(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReview && (
        <EditReviewModal
          open={isModalOpen}
          onClose={handleClose}
          review={selectedReview}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default MyReviews;

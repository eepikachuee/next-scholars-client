import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const AddReviewModal = ({ open, onClose, scholarship }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      ...data,
      rating: parseFloat(data.rating),
      reviewDate: new Date(),
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      universityId: scholarship._id,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
    };

    try {
      const res = await axiosPublic.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your review has been submitted.", "success");
        reset();

        document.activeElement?.blur();

        onClose();
      }
    } catch (err) {
      onClose();
      Swal.fire("Error!", "Failed to submit review.", "error", err);
    }
  };

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Review</DialogTitle>
              <DialogDescription>
                Submit your feedback for{" "}
                {scholarship?.universityName || "this university"}.
              </DialogDescription>
            </DialogHeader>
            {scholarship && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Rating */}
                <div>
                  <Label>Rating</Label>
                  <Controller
                    name="rating"
                    control={control}
                    rules={{ required: "Rating is required" }}
                    render={({ field }) => (
                      <Rating
                        style={{ maxWidth: 160 }}
                        value={field.value || 0}
                        onChange={field.onChange}
                        isRequired
                      />
                    )}
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    {...register("comment", {
                      required: "Comment is required",
                    })}
                  />
                  {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.comment.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Review</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddReviewModal;

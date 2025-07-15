import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect } from "react";

const EditReviewModal = ({ open, onClose, review, onSuccess }) => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: Number(review?.rating) || 0,
      comment: review?.comment || "",
    },
  });

  useEffect(() => {
    if (review) {
      reset({
        rating: Number(review.rating) || 0,
        comment: review.comment || "",
      });
    }
  }, [review, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosPublic.patch(`/reviews/${review._id}`, {
        ...data,
        rating: parseFloat(data.rating),
        reviewDate: new Date(),
      });

      Swal.fire("Success!", "Review updated successfully.", "success");
      onClose();
      onSuccess();
    } catch (error) {
      Swal.fire("Error!", "Failed to update review.", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>
            Update your feedback for {review.universityName}
          </DialogDescription>
        </DialogHeader>

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

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewModal;

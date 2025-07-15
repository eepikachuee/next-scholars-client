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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect } from "react";

const EditApplicationModal = ({ open, onClose, application }) => {
  const axiosPublic = useAxiosPublic();
  // console.log(application);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      ssc: "",
      hsc: "",
      gender: "",
      degree: "",
      studyGap: "",
    },
  });

  useEffect(() => {
    if (open && application) {
      reset({
        address: application.address || "",
        phone: application.phone || "",
        ssc: application.ssc || "",
        hsc: application.hsc || "",
        gender: application.gender || "",
        degree: application.degree || "",
        studyGap: application.studyGap || "",
      });
    }
  }, [open, application, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosPublic.patch(`/appliedScholarships/${application._id}`, data);
      Swal.fire("Updated!", "Application updated successfully.", "success");
      reset();
      onClose();
    } catch (error) {
      onClose();
      Swal.fire("Error!", "Failed to update application.", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {application && (
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
            <DialogDescription>
              Update your submitted scholarship application details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* SSC GPA */}
            <div>
              <Label htmlFor="ssc">SSC GPA</Label>
              <Input
                id="ssc"
                {...register("ssc", { required: "SSC GPA is required" })}
              />
              {errors.ssc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ssc.message}
                </p>
              )}
            </div>

            {/* HSC GPA */}
            <div>
              <Label htmlFor="hsc">HSC GPA</Label>
              <Input
                id="hsc"
                {...register("hsc", { required: "HSC GPA is required" })}
              />
              {errors.hsc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.hsc.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <Controller
                name="gender"
                control={control}
                defaultValue={application?.gender || ""}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Degree */}
            <div>
              <Label>Applying Degree</Label>
              <Controller
                name="degree"
                control={control}
                rules={{ required: "Degree is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Masters">Masters</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.degree && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.degree.message}
                </p>
              )}
            </div>

            {/* Study Gap (optional) */}
            <div>
              <Label>Study Gap (Optional)</Label>
              <Controller
                name="studyGap"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Study Gap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 year">1 year</SelectItem>
                      <SelectItem value="2 years">2 years</SelectItem>
                      <SelectItem value="3+ years">3+ years</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EditApplicationModal;

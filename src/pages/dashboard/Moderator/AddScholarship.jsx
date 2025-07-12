import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import uploadImageToImgbb from "@/utils/uploadImageToImgbb"; // You'll create this

const AddScholarship = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const imageUrl = await uploadImageToImgbb(data.universityImage[0]);

      const scholarshipData = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        universityImage: imageUrl,
        country: data.country,
        city: data.city,
        worldRank: data.worldRank,
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: data.tuitionFees || "N/A",
        applicationFees: data.applicationFees,
        serviceCharge: data.serviceCharge,
        deadline: data.deadline,
        postDate: new Date(),
        postedBy: user.email,
      };

      await axiosPublic.post("/scholarships", scholarshipData);
      toast.success("Scholarship added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add scholarship");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Add Scholarship</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          {...register("scholarshipName")}
          placeholder="Scholarship Name"
          required
        />
        <Input
          {...register("universityName")}
          placeholder="University Name"
          required
        />
        <Input type="file" {...register("universityImage")} required />
        <Input {...register("country")} placeholder="Country" required />
        <Input {...register("city")} placeholder="City" required />
        <Input {...register("worldRank")} placeholder="World Rank" required />

        <Controller
          name="subjectCategory"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Subject Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Doctor">Doctor</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="scholarshipCategory"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Scholarship Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full fund">Full fund</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Self-fund">Self-fund</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="degree"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diploma">Diploma</SelectItem>
                <SelectItem value="Bachelor">Bachelor</SelectItem>
                <SelectItem value="Masters">Masters</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Input
          {...register("tuitionFees")}
          placeholder="Tuition Fees (optional)"
        />
        <Input
          {...register("applicationFees")}
          placeholder="Application Fees"
          required
        />
        <Input
          {...register("serviceCharge")}
          placeholder="Service Charge"
          required
        />
        <Input type="date" {...register("deadline")} required />

        <div className="md:col-span-2">
          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? "Uploading..." : "Add Scholarship"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;

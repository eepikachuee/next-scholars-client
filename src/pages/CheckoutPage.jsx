import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import uploadImageToImgbb from "@/utils/uploadImageToImgbb";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [scholarship, setScholarship] = useState(null);
  const { id } = useParams();
  const [applicationData, setApplicationData] = useState(null);

  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    if (id) {
      axiosPublic.get(`/scholarships/details/${id}`).then((res) => {
        setScholarship(res.data);
      });
    }
  }, [id, axiosPublic]);

  const onSubmit = async (data) => {
    try {
      const imageFile = data.photo[0];
      if (!imageFile) {
        toast.error("Please upload a photo.");
        return;
      }

      if (!user || !scholarship) {
        toast.error("User or scholarship data is missing.");
        return;
      }

      const imageUrl = await uploadImageToImgbb(imageFile); // ✅ fixed this

      const application = {
        ...data,
        photo: imageUrl,
        userName: user.displayName,
        userEmail: user.email,
        userId: user._id,
        scholarshipId: id,
        applyDate: new Date(),
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
      };

      setApplicationData(application);
      toast.success("Application data ready, please complete payment.");
    } catch (error) {
      console.error("Application error:", error); // ✅ log the real error
      toast.error("Something went wrong preparing application.");
    }
  };

  if (!scholarship) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Apply for {scholarship.scholarshipName}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 bg-muted p-6 rounded-xl shadow-md"
      >
        <Input
          {...register("phone", { required: true })}
          placeholder="Phone Number"
        />
        <Input type="file" {...register("photo", { required: true })} />
        <Input
          {...register("address", { required: true })}
          placeholder="Address"
        />

        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: true }}
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

        <Controller
          name="degree"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Applying Degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diploma">Diploma</SelectItem>
                <SelectItem value="Bachelor">Bachelor</SelectItem>
                <SelectItem value="Masters">Masters</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Input {...register("ssc", { required: true })} placeholder="SSC GPA" />
        <Input {...register("hsc", { required: true })} placeholder="HSC GPA" />

        {/* Study Gap Dropdown (optional) */}
        <Controller
          name="studyGap"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Study Gap (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 year">1 year</SelectItem>
                <SelectItem value="2 years">2 years</SelectItem>
                <SelectItem value="3+ years">3+ years</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* Read-only fields styled properly */}
        {scholarship && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                University Name
              </label>
              <Input defaultValue={scholarship.universityName} readOnly />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Scholarship Category
              </label>
              <Input defaultValue={scholarship.scholarshipCategory} readOnly />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subject Category
              </label>
              <Input defaultValue={scholarship.subjectCategory} readOnly />
            </div>
          </div>
        )}

        <Button type="submit">Submit Application Data</Button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Pay Application Fees</h3>
        {applicationData ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              scholarship={scholarship}
              applicationData={applicationData}
              onSuccess={() => {
                reset();
                setApplicationData(null);
              }}
            />
          </Elements>
        ) : (
          <p className="text-muted-foreground text-sm">
            Please fill out and submit the application form first.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { toast } from "react-toastify";
import { useParams } from "react-router";
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
import { PulseLoader } from "react-spinners";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/loading/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [scholarship, setScholarship] = useState(null);
  const { id } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      axiosSecure.get(`/scholarships/details/${id}`).then((res) => {
        setScholarship(res.data);
      });
    }
  }, [id, axiosSecure]);

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const imageFile = data.photo[0];
      if (!imageFile) {
        toast.error("Please upload a photo.");
        return;
      }

      if (!user || !scholarship) {
        toast.error("User or scholarship data is missing.");
        return;
      }

      const imageUrl = await uploadImageToImgbb(imageFile); // fixed this

      const application = {
        ...data,
        photo: imageUrl,
        userName: user.displayName,
        userEmail: user.email,
        userId: user._id,
        scholarshipId: id,
        applyDate: new Date(),
        applicationStatus: "pending",
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        postedBy: scholarship.postedBy,
      };

      setApplicationData(application);
      toast.success("Application data ready, please complete payment.");
    } catch (error) {
      console.error("Application error:", error); //log the real error
      toast.error("Something went wrong preparing application.");
    } finally {
      setUploading(false);
    }
  };

  if (!scholarship) return <Loading></Loading>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Apply for {scholarship.scholarshipName}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 bg-muted p-6 rounded-xl shadow-md"
      >
        {/* Phone Number */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Enter your phone number"
            className="w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Your Photo
          </label>
          <Input
            type="file"
            {...register("photo", { required: "Photo is required" })}
            className="w-full"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Address
          </label>
          <Input
            {...register("address", { required: "Address is required" })}
            placeholder="Enter your address"
            className="w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Gender, Degree, Study Gap */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Gender */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
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
          <div className="w-full md:w-1/3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Applying Degree
            </label>
            <Controller
              name="degree"
              control={control}
              defaultValue=""
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

          {/* Study Gap */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Study Gap (optional)
            </label>
            <Controller
              name="studyGap"
              control={control}
              defaultValue=""
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
        </div>

        {/* SSC & HSC GPA */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              SSC GPA
            </label>
            <Input
              {...register("ssc", { required: "SSC GPA is required" })}
              className="w-full"
            />
            {errors.ssc && (
              <p className="text-red-500 text-sm mt-1">{errors.ssc.message}</p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              HSC GPA
            </label>
            <Input
              {...register("hsc", { required: "HSC GPA is required" })}
              className="w-full"
            />
            {errors.hsc && (
              <p className="text-red-500 text-sm mt-1">{errors.hsc.message}</p>
            )}
          </div>
        </div>

        {/* Read-only Scholarship Info */}
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

        {/* Submit Button */}
        <div className="pt-2">
          <Button type="submit" disabled={uploading} className="w-full">
            {uploading ? (
              <PulseLoader color="#ffffff" size={10} />
            ) : (
              "Submit Application Data"
            )}
          </Button>
        </div>
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

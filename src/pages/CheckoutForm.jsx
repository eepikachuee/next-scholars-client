import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const CheckoutForm = ({ scholarship, applicationData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const paymentRes = await axiosPublic.post("/create-payment-intent", {
      amount: scholarship.applicationFees * 100, // in cents
    });
    const { clientSecret } = paymentRes.data;

    const confirmRes = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmRes.error) {
      toast.error("Payment failed");
      setUploading(false);
    } else if (confirmRes.paymentIntent.status === "succeeded") {
      try {
        await axiosPublic.post("/appliedScholarships", applicationData);
        toast.success("Application submitted successfully!");
        if (onSuccess) onSuccess();
      } catch (err) {
        toast.error("Payment succeeded but failed to save application.", err);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type="submit"
        disabled={!stripe || !applicationData || uploading}
        className="mt-4"
      >
        {uploading ? (
          <PulseLoader color="#ffffff" size={10} />
        ) : (
          `Pay ${scholarship.applicationFees} and Apply`
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;

import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import EditApplicationModal from "@/components/modal/EditApplicationModal/EditApplicationModal";
import AddReviewModal from "@/components/modal/AddReviewModal/AddReviewModal";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleEdit = (app) => {
    if (app.status !== "pending") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Edit",
        text: "This application is already being processed.",
        confirmButtonColor: "#3085d6",
      });
    } else {
      setSelectedApplication(app);
      setIsModalOpen(true);
    }
  };

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/appliedScholarships/user/${user?.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirmed = confirm(
      "Are you sure you want to cancel this application?"
    );
    if (!confirmed) return;
    try {
      const res = await axiosPublic.delete(`/appliedScholarships/cancel/${id}`);
      if (res.data?.success) {
        toast.success("Application cancelled successfully!");
        refetch();
      } else {
        toast.error("Failed to cancel application.");
      }
    } catch (err) {
      toast.error("Failed to cancel application.", err);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Applied Scholarships</h2>
      <table className="table-auto w-full border text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-2 border">University Name</th>
            <th className="p-2 border">University Address</th>
            <th className="p-2 border">Feedback</th>
            <th className="p-2 border">Subject Category</th>
            <th className="p-2 border">Degree</th>
            <th className="p-2 border">Fees</th>
            <th className="p-2 border">Service Charge</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="p-2 border">{app.universityName}</td>
              <td className="p-2 border">{app.address || "N/A"}</td>
              <td className="p-2 border">{app.feedback || "Not Given"}</td>
              <td className="p-2 border">{app.subjectCategory}</td>
              <td className="p-2 border">{app.degree}</td>
              <td className="p-2 border">${app.applicationFees}</td>
              <td className="p-2 border">${app.serviceCharge || "0"}</td>
              <td className="p-2 border capitalize text-blue-600">
                {app.status}
              </td>
              <td className="p-2 border space-y-1 flex flex-col">
                <Link to={`/scholarships/${app.scholarshipId}`}>
                  <Button size="sm" className="w-full">
                    Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleEdit(app)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => handleCancel(app._id)}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSelectedScholarship(app);
                    setIsReviewOpen(true);
                  }}
                >
                  Add Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditApplicationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
      />

      <AddReviewModal
        open={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        scholarship={selectedScholarship}
      />
    </div>
  );
};

export default MyApplications;

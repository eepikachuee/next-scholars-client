import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const ManageScholarships = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const queryClient = useQueryClient();
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [viewingScholarship, setViewingScholarship] = useState(null);

  // console.log("Fetching scholarships for:", user?.email);

  const {
    data: scholarships = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["scholarships", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships`);
      // console.log("Fetching scholarships for:", user?.email);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosPublic.delete(`/scholarships/${id}`);
    },
    onSuccess: () => {
      toast.success("Scholarship deleted");
      queryClient.invalidateQueries(["scholarships"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosPublic.patch(`/scholarships/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Scholarship updated");
      setEditingScholarship(null);
      queryClient.invalidateQueries(["scholarships"]);
    },
  });

  const Info = ({ label, value }) => (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      // universityImage: form.universityImage.value,
      country: form.country.value,
      city: form.city.value,
      worldRank: form.worldRank.value,
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: form.tuitionFees.value,
      applicationFees: form.applicationFees.value,
      serviceCharge: form.serviceCharge.value,
      deadline: form.deadline.value,
    };

    updateMutation.mutate({ id: editingScholarship._id, data: updatedData });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Scholarships</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-muted">
              <th className="p-3">Name</th>
              <th className="p-3">University</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Degree</th>
              <th className="p-3">App Fee</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.scholarshipName}</td>
                <td className="p-3">{item.universityName}</td>
                <td className="p-3">{item.subjectCategory}</td>
                <td className="p-3">{item.degree}</td>
                <td className="p-3">${item.applicationFees}</td>
                <td className="p-3 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewingScholarship(item)}
                  >
                    <FaEye className="w-4 h-4" />
                  </Button>

                  {/* Edit button just sets the editing scholarship */}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditingScholarship(item)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(item._id)}
                  >
                    <FaTrash className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Single Dialog outside the map */}
      {editingScholarship && (
        <Dialog open={true} onOpenChange={() => setEditingScholarship(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Scholarship</DialogTitle>
              <DialogDescription>
                Update any field and click "Update" to save changes.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdate} className="grid gap-3 mt-4">
              <Input
                name="scholarshipName"
                defaultValue={editingScholarship.scholarshipName}
                required
              />
              <Input
                name="universityName"
                defaultValue={editingScholarship.universityName}
                required
              />

              {/* File upload for image */}
              {/* <div>
                <label className="block mb-1 text-sm font-medium">
                  University Image
                </label>
                <input
                  type="file"
                  name="universityImage"
                  accept="image/*"
                  className="text-sm"
                />
                <small className="text-gray-400">
                  Current:{" "}
                  <a
                    href={editingScholarship.universityImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    View image
                  </a>
                </small>
              </div> */}

              <Input
                name="country"
                defaultValue={editingScholarship.country}
                required
              />
              <Input
                name="city"
                defaultValue={editingScholarship.city}
                required
              />
              <Input
                name="worldRank"
                defaultValue={editingScholarship.worldRank}
                required
              />

              {/* Select fields */}
              <select
                name="subjectCategory"
                defaultValue={editingScholarship.subjectCategory}
                required
                className="p-2 rounded bg-background border"
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>

              <select
                name="scholarshipCategory"
                defaultValue={editingScholarship.scholarshipCategory}
                required
                className="p-2 rounded bg-background border"
              >
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>

              <select
                name="degree"
                defaultValue={editingScholarship.degree}
                required
                className="p-2 rounded bg-background border"
              >
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>

              <Input
                name="tuitionFees"
                defaultValue={editingScholarship.tuitionFees}
              />
              <Input
                name="applicationFees"
                defaultValue={editingScholarship.applicationFees}
                required
              />
              <Input
                name="serviceCharge"
                defaultValue={editingScholarship.serviceCharge}
                required
              />

              <Input
                name="deadline"
                type="date"
                defaultValue={editingScholarship.deadline?.slice(0, 10)}
                required
              />

              <Button type="submit">Update</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {viewingScholarship && (
        <Dialog open={true} onOpenChange={() => setViewingScholarship(null)}>
          <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-2xl shadow-xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-center">
                {viewingScholarship.scholarshipName}
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Detailed scholarship information
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <img
                  src={viewingScholarship.universityImage}
                  alt={viewingScholarship.universityName}
                  className="w-full h-56 object-cover rounded-xl border"
                />
              </div>

              <Info
                label="University"
                value={viewingScholarship.universityName}
              />
              <Info label="Country" value={viewingScholarship.country} />
              <Info label="City" value={viewingScholarship.city} />
              <Info label="World Rank" value={viewingScholarship.worldRank} />
              <Info
                label="Subject Category"
                value={viewingScholarship.subjectCategory}
              />
              <Info
                label="Scholarship Category"
                value={viewingScholarship.scholarshipCategory}
              />
              <Info label="Degree" value={viewingScholarship.degree} />
              <Info
                label="Tuition Fees"
                value={viewingScholarship.tuitionFees || "N/A"}
              />
              <Info
                label="Application Fees"
                value={`$${viewingScholarship.applicationFees}`}
              />
              <Info
                label="Service Charge"
                value={`$${viewingScholarship.serviceCharge}`}
              />
              <Info
                label="Deadline"
                value={new Date(
                  viewingScholarship.deadline
                ).toLocaleDateString()}
              />
              <Info
                label="Post Date"
                value={new Date(
                  viewingScholarship.postDate
                ).toLocaleDateString()}
              />
              <Info label="Posted By" value={viewingScholarship.postedBy} />
            </div>

            <Button
              onClick={() => setViewingScholarship(null)}
              className="w-full mt-6"
              variant="outline"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageScholarships;

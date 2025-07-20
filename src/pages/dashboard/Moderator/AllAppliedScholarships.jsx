import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [sortBy, setSortBy] = useState(""); // track selected sort option
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const fetchApplications = async () => {
    const res = await axiosSecure.get("/allAppliedScholarships");
    setApplications(res.data);
    setFilteredApps(res.data); // initially no sorting, show as fetched
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);
    let sorted = [...applications];

    if (value === "appliedDate") {
      sorted.sort((a, b) => new Date(b.applyDate) - new Date(a.applyDate));
    } else if (value === "deadline") {
      sorted.sort(
        (a, b) =>
          new Date(a.scholarshipDeadline) - new Date(b.scholarshipDeadline)
      );
    }

    setFilteredApps(sorted);
  };

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/applications/status/${id}`, {
          status: "rejected",
        });
        Swal.fire("Rejected!", "Application has been rejected.", "success");
        fetchApplications();
      } catch (error) {
        console.error("Error rejecting application:", error);
        Swal.fire("Error!", "Failed to reject application", "error");
      }
    }
  };

  const handleSubmitFeedback = async () => {
    await axiosSecure.patch(`/appliedScholarships/${selectedApp._id}`, {
      feedback: feedbackText,
      status: "processing",
    });
    setFeedbackModal(false);
    Swal.fire("Feedback Sent!", "Feedback has been submitted.", "success");
    fetchApplications();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold mb-2">All Applied Scholarships</h2>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="appliedDate">Sort by Applied Date</SelectItem>
            <SelectItem value="deadline">
              Sort by Scholarship Deadline
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 border">Applicant</th>
              <th className="p-2 border">University</th>
              <th className="p-2 border">Degree</th>
              <th className="p-2 border">Scholarship</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app._id}>
                <td className="p-2 border">{app.userName}</td>
                <td className="p-2 border">{app.universityName}</td>
                <td className="p-2 border">{app.degree}</td>
                <td className="p-2 border">{app.scholarshipCategory}</td>
                <td className="p-2 border">
                  <Badge
                    variant={
                      app.status === "pending"
                        ? "default"
                        : app.status === "processing"
                        ? "secondary"
                        : app.status === "completed"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {app.status}
                  </Badge>
                </td>
                <td className="p-2 border space-y-2 flex flex-col">
                  <Button
                    onClick={() => {
                      setSelectedApp(app);
                      setDetailsModal(true);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedbackModal(true);
                    }}
                  >
                    Feedback
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancel(app._id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Dialog open={detailsModal} onOpenChange={setDetailsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-2">
              <p>
                <strong>University:</strong> {selectedApp.universityName}
              </p>
              <p>
                <strong>Degree:</strong> {selectedApp.degree}
              </p>
              <p>
                <strong>Scholarship Category:</strong>{" "}
                {selectedApp.scholarshipCategory}
              </p>
              <p>
                <strong>Subject:</strong> {selectedApp.subjectCategory}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={feedbackModal} onOpenChange={setFeedbackModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter your feedback..."
            />
            <Button onClick={handleSubmitFeedback}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllAppliedScholarships;

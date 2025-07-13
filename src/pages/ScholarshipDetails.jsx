import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    data: scholarship,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships/details/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <Skeleton className="w-full h-96 rounded-xl" />;
  }

  if (isError || !scholarship) {
    return <p className="text-red-500">Failed to load scholarship details.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Card className="rounded-2xl shadow-xl overflow-hidden">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              Posted on: {new Date(scholarship.postDate).toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-primary">
              {scholarship.universityName}
            </h2>
            <p className="text-sm text-muted-foreground">
              <strong>Category:</strong> {scholarship.scholarshipCategory}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Subject:</strong> {scholarship.subjectCategory}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Degree:</strong> {scholarship.degree}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Location:</strong> {scholarship.city},{" "}
              {scholarship.country}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Deadline:</strong> {scholarship.deadline}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Application Fees:</strong> ${scholarship.applicationFees}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Service Charge:</strong> ${scholarship.serviceCharge}
            </p>
            {scholarship.stipend && (
              <p className="text-sm text-muted-foreground">
                <strong>Stipend:</strong> {scholarship.stipend}
              </p>
            )}

            <Button
              className="mt-4 w-full"
              onClick={() => navigate(`/checkout/${scholarship._id}`)}
            >
              Apply Scholarship
            </Button>
          </div>
        </CardContent>

        {/* <div className="p-6 border-t text-sm text-muted-foreground">
          <h3 className="text-lg font-semibold mb-2">
            Scholarship Description
          </h3>
          <p>{scholarship.description || "No description provided."}</p>
        </div> */}
      </Card>
    </div>
  );
};

export default ScholarshipDetails;

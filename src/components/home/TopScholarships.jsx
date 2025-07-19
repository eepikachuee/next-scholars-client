import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import ScholarshipCard from "../scholarshipCard/ScholarshipCard";

const TopScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  // Sort by low applicationFees and recent postDate
  const topScholarships = [...scholarships]
    .sort((a, b) => {
      // First by applicationFees (low to high), then by postDate (newest first)
      if (a.applicationFees !== b.applicationFees) {
        return a.applicationFees - b.applicationFees;
      }
      return new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate);
    })
    .slice(0, 6);

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Top Scholarships
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topScholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship._id} data={scholarship} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="default" onClick={() => navigate("/scholarships")}>
          All Scholarships
        </Button>
      </div>
    </section>
  );
};

export default TopScholarships;

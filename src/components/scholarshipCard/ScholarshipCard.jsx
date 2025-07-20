import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";

const ScholarshipCard = ({ data }) => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    universityName,
    universityImage,
    scholarshipCategory,
    country,
    city,
    deadline,
    subjectCategory,
    applicationFees,
    _id,
  } = data;

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews-by-scholarship", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${_id}`);
      return res.data;
    },
    enabled: !!_id, // ensures the query only runs if _id is available
  });

  // console.log(reviews);

  // if (isLoading) return <Loading></Loading>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-col items-center gap-2">
          <img
            src={universityImage}
            alt={universityName}
            className="w-20 h-20 object-cover rounded-full shadow"
          />
          <CardTitle className="text-lg text-center">
            {universityName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{scholarshipCategory}</p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Location:</strong> {city}, {country}
          </p>
          <p>
            <strong>Subject:</strong> {subjectCategory}
          </p>
          <p>
            <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Application Fees:</strong> ${applicationFees}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {reviews || "N/A"}
          </p>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => navigate(`/scholarships/${_id}`)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScholarshipCard;

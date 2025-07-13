import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { motion } from "framer-motion";
import ScholarshipCard from "../components/scholarshipCard/ScholarshipCard";

const Scholarships = () => {
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchText);
    setCurrentPage(1);
  };

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarships", searchQuery, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allScholarships?search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const scholarships = data.scholarships || [];
  // const totalPages = data.totalPages || 1;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading scholarships</p>;

  if (!Array.isArray(scholarships)) {
    return <p>Invalid scholarship data</p>;
  }

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <Input
          placeholder="Search by Scholarship, University or Degree"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load scholarships</p>
      ) : scholarships.length === 0 ? (
        <div className="text-center mt-10">
          <img
            src="/empty-state.png"
            alt="No scholarships"
            className="mx-auto max-w-sm"
          />
          <p className="mt-4 text-gray-500">No scholarships available</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {scholarships.map((item) => (
            <ScholarshipCard key={item._id} data={item} />
          ))}
        </motion.div>
      )}

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default Scholarships;

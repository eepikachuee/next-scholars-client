import React from "react";
import { useParams } from "react-router";

const ScholarshipDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h4>This is Scholarship Details</h4>
    </div>
  );
};

export default ScholarshipDetails;

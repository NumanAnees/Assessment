import React from "react";
import JobTable from "@/components/JobTable";
import Heading from "@/components/Heading";
import { fetchJobs } from "@/actions/jobs";
import { JobData } from "@/types";

const page = async () => {
  const jobsData: any = await fetchJobs();
  return (
    <div className="flex flex-col gap-8 container mx-auto pt-4 mb-10">
      <Heading main="Jobs" sub="View and manage your jobs" />
      <JobTable jobData={jobsData} />
    </div>
  );
};

export default page;

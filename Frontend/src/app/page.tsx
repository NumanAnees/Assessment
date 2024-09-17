import React from "react";
import JobTable from "@/components/JobTable";
import Heading from "@/components/Heading";
import { fetchJobs } from "@/actions/jobs";

export const revalidate = 30;

const Page = async () => {
  const jobsData = await fetchJobs();

  return (
    <div className="flex flex-col gap-8 container mx-auto pt-4 mb-10">
      <Heading main="Jobs" sub="View and manage your jobs" />
      <JobTable initialJobData={jobsData} />
    </div>
  );
};

export default Page;

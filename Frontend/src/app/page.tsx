import React from "react";
import JobTable from "@/components/JobTable";
import { fetchJobs } from "@/actions/jobs";

const Page = async () => {
  const jobsData = await fetchJobs();

  return <JobTable initialJobData={jobsData} />;
};

export default Page;

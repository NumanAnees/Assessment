import React from "react";
import JobTable from "@/components/JobTable";
import { fetchJobs } from "@/actions/jobs";

export const revalidate = 30;

const Page = async () => {
  const jobsData = await fetchJobs();

  return <JobTable initialJobData={jobsData} />;
};

export default Page;

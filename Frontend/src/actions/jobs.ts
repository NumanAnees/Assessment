"use server";

import { revalidatePath } from "next/cache";

export async function fetchJobs(): Promise<any[]> {
  const response = await fetch("http://localhost:4000/jobs", {
    cache: "no-store",
  });
  return response.json();
}

export async function addJob(): Promise<any> {
  const response = await fetch("http://localhost:4000/jobs", {
    method: "POST",
  });

  const newJob = await response.json();
  revalidatePath("/jobs");
  return newJob;
}

export async function updateJobStatus(
  jobId: string,
  status: string
): Promise<any> {
  const response = await fetch(`http://localhost:4000/jobs/${jobId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updatedJob = await response.json();
  revalidatePath("/jobs");
  return updatedJob;
}

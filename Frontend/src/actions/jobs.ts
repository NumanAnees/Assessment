import { revalidatePath } from "next/cache";
import { JobData } from "@/types";

export async function fetchJobs(): Promise<JobData[]> {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/jobs`, {
      cache: "no-store",
    });

    if (!response) {
      throw new Error(`Error fetching jobs: ${response}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchJobs:", error);
    throw error;
  }
}

export async function addJob(): Promise<JobData> {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/jobs`, {
      method: "POST",
    });

    if (!response) {
      throw new Error(`Error adding job: ${response}`);
    }

    const newJob = await response.json();
    revalidatePath("/jobs");
    return newJob;
  } catch (error) {
    console.error("Error in addJob:", error);
    throw error;
  }
}

export async function pendingJobsCount(): Promise<number> {
  try {
    const response = await fetch(`${process.env.API_ENDPOINT}/jobs/pending`, {
      cache: "no-store",
    });

    if (!response) {
      throw new Error(`Error fetching pending jobs count: ${response}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in pendingJobsCount:", error);
    throw error;
  }
}

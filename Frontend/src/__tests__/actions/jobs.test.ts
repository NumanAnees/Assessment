import { fetchJobs, addJob, pendingJobsCount } from "@/actions/jobs";
import { act } from "@testing-library/react";
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

global.fetch = jest.fn();

describe("Job actions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("fetchJobs returns job data", async () => {
    const mockJobs = [{ jobId: "1", status: "PENDING" }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockJobs),
    });

    const result = await fetchJobs();
    expect(result).toEqual(mockJobs);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.API_ENDPOINT}/jobs`,
      {
        cache: "no-store",
      }
    );
  });

  test("addJob adds a new job", async () => {
    const mockNewJob = {
      jobId: "1",
      status: "PENDING",
      createdAt: new Date("2023-05-15T10:00:00"),
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockNewJob),
    });

    await act(async () => {
      const result = await addJob();
      expect(result).toEqual(mockNewJob);
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.API_ENDPOINT}/jobs`,
        {
          method: "POST",
        }
      );
    });
  });

  test("pendingJobsCount returns the count of pending jobs", async () => {
    const mockCount = 5;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCount),
    });

    const result = await pendingJobsCount();
    expect(result).toEqual(mockCount);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.API_ENDPOINT}/jobs/pending`,
      { cache: "no-store" }
    );
  });
});

import { renderHook } from "@testing-library/react";
import { useJobTable } from "@/hooks/useJobTable";
import { JobData } from "@/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

jest.mock("@/actions/jobs");

describe("useJobTable hook", () => {
  const mockInitialJobData: JobData[] = [
    {
      jobId: "1",
      status: "PENDING",
      createdAt: new Date(),
      resolvedAt: undefined,
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("initializes with correct initial state", () => {
    const { result } = renderHook(() => useJobTable(mockInitialJobData));

    expect(result.current.jobs).toEqual(mockInitialJobData);
    expect(result.current.paginatedJobs).toEqual(mockInitialJobData);
  });
});

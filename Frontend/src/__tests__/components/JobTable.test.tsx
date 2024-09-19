import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobTable from "@/components/JobTable";
import { useJobTable } from "@/hooks/useJobTable";
import { JobData } from "@/types";

jest.mock("@/hooks/useJobTable");
jest.mock("@/actions/jobs");

jest.mock("@/components/DataTable/data-table", () => ({
  DataTable: jest.fn(() => <table data-testid="mock-data-table" />),
}));

jest.mock("@/components/DataTable/data-table-pagination", () => ({
  DataTablePagination: jest.fn(() => (
    <nav data-testid="mock-data-table-pagination" />
  )),
}));

const mockJobs: JobData[] = [
  { jobId: "1", status: "PENDING", createdAt: new Date("2023-05-15T10:00:00") },
  {
    jobId: "2",
    status: "COMPLETED",
    createdAt: new Date("2023-05-15T11:00:00"),
  },
];

const mockHandleAddJob = jest.fn();

describe("JobTable Component", () => {
  beforeEach(() => {
    (useJobTable as jest.Mock).mockReturnValue({
      jobs: mockJobs,
      table: {
        getHeaderGroups: jest.fn(() => [
          {
            headers: [
              {
                id: "jobId",
                column: { getToggleSortingHandler: () => jest.fn() },
              },
              {
                id: "status",
                column: { getToggleSortingHandler: () => jest.fn() },
              },
              {
                id: "createdAt",
                column: { getToggleSortingHandler: () => jest.fn() },
              },
            ],
          },
        ]),
        getRowModel: jest.fn(() => ({
          rows: mockJobs.map((job) => ({
            original: job,
            getVisibleCells: () => [
              { id: "jobId", getValue: () => job.jobId },
              { id: "status", getValue: () => job.status },
              { id: "createdAt", getValue: () => job.createdAt },
            ],
          })),
        })),
        getState: jest.fn(() => ({
          pagination: { pageIndex: 0, pageSize: 10 },
        })),
        setPageIndex: jest.fn(),
        getCanPreviousPage: jest.fn(() => true),
        getCanNextPage: jest.fn(() => true),
        getPageCount: jest.fn(() => 1),
        nextPage: jest.fn(),
        previousPage: jest.fn(),
        setPageSize: jest.fn(),
      },
      paginatedJobs: mockJobs,
      handleAddJob: mockHandleAddJob,
    });
  });

  test("renders JobTable with correct data", () => {
    render(<JobTable initialJobData={mockJobs} />);

    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("View and manage your jobs")).toBeInTheDocument();
    expect(screen.getByText("+ Add Job")).toBeInTheDocument();
    expect(screen.getByTestId("mock-data-table")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-data-table-pagination")
    ).toBeInTheDocument();
  });

  test("calls handleAddJob when Add Job button is clicked", async () => {
    render(<JobTable initialJobData={mockJobs} />);

    const addJobButton = screen.getByText("+ Add Job");
    fireEvent.click(addJobButton);

    await waitFor(() => {
      expect(mockHandleAddJob).toHaveBeenCalledTimes(1);
    });
  });
});

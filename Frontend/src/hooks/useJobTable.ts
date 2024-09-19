import { useState, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { columns } from "@/components/DataTable/data-table-columns";
import { fetchJobs, pendingJobsCount, addJob } from "@/actions/jobs";
import { JobData } from "@/types";

export const useJobTable = (initialJobData: JobData[]) => {
  const [jobs, setJobs] = useState<JobData[]>(initialJobData);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [newJobAdded, setNewJobAdded] = useState(false);

  const handleAddJob = async () => {
    try {
      await addJob();
      setNewJobAdded(true);

      setPagination((prevPagination) => ({
        ...prevPagination,
        pageIndex: 0,
        pageSize: prevPagination.pageSize,
      }));
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const fetchJobsData = useCallback(async () => {
    try {
      const updatedJobs = await fetchJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const pollJobs = async () => {
      try {
        const count = await pendingJobsCount();
        const delay = count > 0 || newJobAdded ? 5000 : 30000;
        await fetchJobsData();

        setNewJobAdded(false);

        timeoutId = setTimeout(pollJobs, delay);
      } catch (error) {
        console.error("Error fetching pending jobs count:", error);
      }
    };

    pollJobs();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fetchJobsData, newJobAdded]);

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    pageCount: Math.ceil(jobs.length / pagination.pageSize),
  });

  const paginatedJobs = jobs.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  return { jobs, table, paginatedJobs, handleAddJob };
};

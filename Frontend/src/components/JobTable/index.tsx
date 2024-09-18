"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { columns } from "@/components/DataTable/data-table-columns";
import { addJob, fetchJobs, pendingJobsCount } from "@/actions/jobs";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";

interface JobTableProps {
  initialJobData: any[];
}

export default function JobTable({ initialJobData }: JobTableProps) {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>(initialJobData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [newJobAdded, setNewJobAdded] = useState(false);

  const handleAddJob = async () => {
    try {
      await addJob();
      setNewJobAdded(true);
      router.refresh();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const fetchJobsData = useCallback(async () => {
    try {
      const updatedJobs = await fetchJobs();
      setJobs(updatedJobs);
      router.refresh();
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [router]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const pollJobs = async () => {
      try {
        const count = await pendingJobsCount();
        const delay = count > 0 || newJobAdded ? 5000 : 30000;
        console.log(delay, "delay");
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
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
    pageCount: Math.ceil(jobs.length / pagination.pageSize),
  });

  const paginatedJobs = jobs.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  return (
    <div className="flex flex-col gap-8 container mx-auto pt-4 mb-10">
      <Heading
        main="Jobs"
        sub="View and manage your jobs"
        handleAddJob={handleAddJob}
      />
      <div className="flex flex-col space-y-4">
        <DataTable table={table} data={paginatedJobs} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { columns } from "@/components/DataTable/data-table-columns";
import { fetchJobs } from "@/actions/jobs";
import { useRouter } from "next/navigation";

interface JobTableProps {
  initialJobData: any[];
}

export default function JobTable({ initialJobData }: JobTableProps) {
  const [jobs, setJobs] = useState<any[]>(initialJobData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const updatedJobs = await fetchJobs();
      setJobs(updatedJobs);
      router.refresh();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [router]);

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

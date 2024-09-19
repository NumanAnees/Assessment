"use client";

import React from "react";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import Heading from "@/components/Heading";
import { useJobTable } from "@/hooks/useJobTable";
import { JobData } from "@/types";

interface JobTableProps {
  initialJobData: JobData[];
}

export default function JobTable({ initialJobData }: JobTableProps) {
  const { table, paginatedJobs, handleAddJob } = useJobTable(initialJobData);

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

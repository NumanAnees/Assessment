import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { JobData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<JobData>[] = [
  {
    accessorKey: "jobId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          job Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => (
      <span className="ml-4">{row.getValue() as JobData["jobId"]}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const status = row.getValue() as JobData["status"];
      return (
        <Badge
          className={`${
            status === "failed"
              ? "bg-red-500 hover:bg-red-500"
              : status === "pending"
              ? "bg-yellow-500 hover:bg-yellow-500"
              : "bg-[#00A795] hover:bg-[#00A795]"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => (
      <span className="ml-4">
        {formatDate(row.getValue() as JobData["createdAt"])}
      </span>
    ),
  },
  {
    accessorKey: "resolvedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resolved At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => (
      <span className="ml-4">
        {formatDate(row.getValue() as JobData["resolvedAt"])}
      </span>
    ),
  },
];

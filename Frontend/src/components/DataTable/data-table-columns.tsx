import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { JobData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<JobData>[] = [
  {
    accessorKey: "jobId",
    header: "job Id",
    cell: (row) => (
      <span className="ml-4">{row.getValue() as JobData["jobId"]}</span>
    ),
  },
  {
    accessorKey: "result",
    header: "Image",
    cell: (row) => {
      const imageURL = (row.getValue() as JobData["result"])?.url;
      return imageURL ? (
        <Image src={imageURL} alt="Job Image" width={100} height={100} />
      ) : (
        <span>Waiting for image...</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const status = row.getValue() as JobData["status"];
      return (
        <Badge
          className={`${
            status === "FAILED"
              ? "bg-red-500 hover:bg-red-500"
              : status === "PENDING"
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
    header: () => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-white"
        >
          Created At
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
    header: () => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-white"
        >
          Resolved At
        </Button>
      );
    },
    cell: (row) => {
      const resolvedAt = row.getValue() as JobData["resolvedAt"];

      return resolvedAt ? (
        <span className="ml-4">
          {formatDate(row.getValue() as JobData["resolvedAt"])}
        </span>
      ) : (
        <span className="ml-4">Waiting for resolving...</span>
      );
    },
  },
];

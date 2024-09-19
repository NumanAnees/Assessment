"use client";
import * as React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  table: Table<TData>;
  data: TData[];
}

export function DataTable<TData>({ table, data }: DataTableProps<TData>) {
  return (
    <div>
      <div className="rounded-md border mb-4">
        <UITable>
          <TableHeader className="rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="bg-black hover:bg-black"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-white group-hover:text-white"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row: any, rowIndex) => (
                <TableRow key={rowIndex}>
                  {table.getAllColumns().map((column) => (
                    <TableCell key={column.id}>
                      {flexRender(column.columnDef.cell, {
                        getValue: () => row[column.id as keyof typeof row],
                        // @ts-expect-error This is required due to type checking limitations
                        row: { original: row },
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
}

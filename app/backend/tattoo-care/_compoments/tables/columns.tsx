"use client";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Tattoocare } from "@/app/types/type";

export const columns = (): ColumnDef<Tattoocare>[] => [
  {
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "content",
    header: "CONTENT",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

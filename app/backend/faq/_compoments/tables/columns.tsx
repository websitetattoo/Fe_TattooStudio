"use client";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Faq } from "@/app/types/type";

export const columns = (): ColumnDef<Faq>[] => [
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

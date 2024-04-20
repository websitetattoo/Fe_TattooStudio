"use client";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "@/app/types/type";

export const columns = (): ColumnDef<Booking>[] => [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "schedule",
    header: "SCHEDULE",
  },
  {
    accessorKey: "artist",
    header: "ARTIST",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

"use client";

import { format } from "date-fns";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { News } from "@/app/types/type";

export const columns = (): ColumnDef<News>[] => [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => (
      <div className=" w-40 md:w-[300px]">
        <Image
          width={700}
          height={700}
          className="h-20 align-middle md:h-[200px] md:object-cover lg:object-center"
          src={row.original.image}
          alt="File"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="line-clamp-6 w-auto md:w-[100px]">
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "created Date",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="w-full">
        {format(new Date(row.original.createdDate), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "content",
    header: "Content",
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="w-full">
        <CellAction data={row.original} />
      </div>
    ),
  },
];

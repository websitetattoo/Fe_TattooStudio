"use client";

import { format } from "date-fns";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { News } from "@/app/types/type";

interface ColumnsProps {
  onRefresh: () => void; // Định nghĩa hàm onRefresh
}

export const columns = ({ onRefresh }: ColumnsProps): ColumnDef<News>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => (
      <div>
        <Image
          width={700}
          height={700}
          className="h-auto w-auto align-middle md:h-[200px] md:w-[2000px] md:object-cover lg:object-center"
          src={row.original.image}
          alt="File"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdDate",
    header: "CreatedDate",
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
        <CellAction data={row.original} onRefresh={onRefresh} />
      </div>
    ), // Truyền hàm onRefresh được nhận từ PoliciesClient sang CellAction
  },
];

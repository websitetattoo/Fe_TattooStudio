"use client";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Policies } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnsProps {
  onRefresh: () => void; // Định nghĩa hàm onRefresh
}

export const columns = ({ onRefresh }: ColumnsProps): ColumnDef<Policies>[] => [
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
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "subtitle",
    header: "SUBTITLE",
  },
  {
    accessorKey: "content",
    header: "CONTENT",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />, // Truyền hàm onRefresh được nhận từ PoliciesClient sang CellAction
  },
];

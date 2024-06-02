"use client";

import Image from "next/image";

import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Artist } from "@/app/types/type";

export const columns = (): ColumnDef<Artist>[] => [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "header",
    header: "HEADER",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "avatar",
    header: "AVATAR",
    cell: ({ row }) => {
      console.log(row);
      const imageUrl = row.original.avatar;

      return (
        <div className=" w-40 md:w-[300px]">
          <Image
            width={700}
            height={700}
            className="h-20 align-middle md:h-[200px] md:object-cover lg:object-center"
            src={imageUrl}
            alt="File"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

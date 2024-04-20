"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/app/types/type";

export const columns = (): ColumnDef<User>[] => [
  {
    accessorKey: "tel",
    header: "Telephone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "instagram",
    header: "Instagram",
  },
  {
    accessorKey: "facebook",
    header: "Facebook",
  },
];

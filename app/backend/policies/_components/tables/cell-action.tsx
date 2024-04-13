"use client";
//Library
import Link from "next/link";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
//Library UI
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//Query
import { useDeletePolicy } from "@/app/query/policies/useDeletePolicy";

import { Policies } from "@/app/types/type";
import { AlertModal } from "@/app/backend/modal/alert-modal";

interface CellActionProps {
  data: Policies | any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { mutationDelete, isLoadingDelete } = useDeletePolicy();

  //Hàm xử lý xoá policy
  const handleDeletePolicy = async () => {
    mutationDelete.mutate(data._id);
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeletePolicy}
        loading={isLoadingDelete}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/backend/policies/${data._id}`}>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

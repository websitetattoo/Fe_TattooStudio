"use client";
//Library
import Link from "next/link";
import { Eye, MoreHorizontal } from "lucide-react";
//Library UI
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

//Query
import { Booking } from "@/app/types/type";

interface CellActionProps {
  data: Booking | any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/backend/booking/${data._id}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

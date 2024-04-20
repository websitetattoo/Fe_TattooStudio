"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//UI library
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { columns } from "./columns";
import { Tattoocare } from "@/app/types/type";
import { DataTable } from "@/app/backend/UI/data-table";

interface TatooCareTablesProps {
  data: Tattoocare[];
  total: number;
}

export const TatooCareTables: React.FC<TatooCareTablesProps> = ({
  data,
  total,
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Tattoo Care (${total})`}
          description="Manage Tattoo Care (Client side table functionalities.)"
        />
        <Link href={`/backend/tattoo-care/create`}>
          <Button className=" text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <DataTable searchKey="title" columns={columns()} data={data} />
    </>
  );
};

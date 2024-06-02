"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//UI library
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { columns } from "./columns";
import { Faq } from "@/app/types/type";
import { DataTable } from "@/app/backend/Comon/data-table";

interface faqTablesProps {
  data: Faq[];
  total: number;
}

export const FaqTables: React.FC<faqTablesProps> = ({ data, total }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Faq (${total})`}
          description="Manage Faq (Client side table functionalities.)"
        />
        <Link href={`/backend/faq/create`}>
          <Button className=" text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <DataTable searchKey="title" columns={columns()} data={data} />
    </>
  );
};

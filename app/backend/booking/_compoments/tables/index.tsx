"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//UI library
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { columns } from "./columns";
import { Booking } from "@/app/types/type";
import { DataTable } from "@/app/backend/Comon/data-table";

interface BookingTablesProps {
  data: Booking[];
  total: number;
}

export const BookingTables: React.FC<BookingTablesProps> = ({
  data,
  total,
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Booking (${total})`}
          description="Manage Booking (Client side table functionalities.)"
        />
      </div>
      <DataTable searchKey="name" columns={columns()} data={data} />
    </>
  );
};

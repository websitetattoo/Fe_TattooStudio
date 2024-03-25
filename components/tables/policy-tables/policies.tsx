"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//...
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Policies } from "@/constants/data";
import { columns } from "./columns";

//Interface Policies
interface PoliciesClientProps {
  data: Policies[];
  onRefresh: () => void;
}

export const PoliciesClient: React.FC<PoliciesClientProps> = ({
  data,
  onRefresh,
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Policies (${data.length})`}
          description="Manage Policies (Client side table functionalities.)"
        />
        <Link href={`/backend/policies/create`}>
          <Button className=" text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable
        searchKey="title"
        columns={columns({ onRefresh })} // Truyền hàm onRefresh được nhận từ bên ngoài -> columns
        data={data}
      />
    </>
  );
};

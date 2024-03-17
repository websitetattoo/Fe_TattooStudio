"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Policies } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import Link from "next/link";

export const PoliciesClient: React.FC<{ data: Policies[] }> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Policies (${data.length})`}
          description="Manage Policies (Client side table functionalities.)"
        />
        <Link href={`/backend/policies/create`}>
          <Button className="bg-tattoo-highlight text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="headerTitle" columns={columns} data={data} />
    </>
  );
};

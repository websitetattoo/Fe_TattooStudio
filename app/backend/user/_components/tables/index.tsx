"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//...
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { User } from "@/app/types/type";
import { DataTable } from "./user-table";
import { columns } from "./columns";

//Interface Policies
interface UsersClientProps {
  data: User[];
}

export const UsersTables: React.FC<UsersClientProps> = ({ data }) => {
  let id;
  if (data && data.length > 0) {
    id = data[0]._id;
  }
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Users Infomation`} />
        <Link href={`/backend/user/${id}`}>
          <Button className=" text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Update
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns()} data={data} />
    </>
  );
};

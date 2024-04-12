"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//...
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { News } from "@/app/types/type";
import { DataTable } from "./data";

//Interface Policies
interface NewsClientProps {
  data: News[];
  onRefresh: () => void;
}

export const NewsClient: React.FC<NewsClientProps> = ({ data, onRefresh }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`News (${data.length})`}
          description="Manage News (Client side table functionalities.)"
        />
        <Link href={`/backend/news/create`}>
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

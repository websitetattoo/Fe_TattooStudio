"use client";
//Library
import { Plus } from "lucide-react";
import Link from "next/link";
//UI library
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { columns } from "./columns";
import { Artist } from "@/app/types/type";
import { DataTable } from "@/app/backend/Common/data-table";
import { stripHtmlTags } from "@/lib/utils";

interface ArtistTablesProps {
  data: Artist[];
  total: number;
}

export const ArtistTables: React.FC<ArtistTablesProps> = ({ data, total }) => {
  const dataArtistConvert = data?.map((item) => ({
    ...item,
    description: stripHtmlTags(item.description),
  }));

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Artist (${total})`}
          description="Manage Artist (Client side table functionalities.)"
        />
        <Link href={`/backend/artists/create`}>
          <Button className=" text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>
      <DataTable
        searchKey="name"
        columns={columns()}
        data={dataArtistConvert}
      />
    </>
  );
};

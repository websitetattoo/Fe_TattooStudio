"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Query
import { useGetDataArtistById } from "@/app/query/artist/useGetArtistById";
//Type
import { Artist } from "@/app/types/type";
import BreadCrumb from "@/components/breadcrumb";
import { ViewArtist } from "../../_compoments/forms/view";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<Artist | null>(null);

  //useQuery
  const { data: Artist, isLoading } = useGetDataArtistById(
    params.id.toString(),
  );

  const breadcrumbItems = [
    { title: "Artist", link: "/backend/artist" },
    { title: "View", link: "#" },
  ];

  useEffect(() => {
    const data = Artist as Artist;
    setInitialData(data);
  }, [Artist, isLoading]);

  if (initialData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ViewArtist initialData={initialData} key={null} />
      </div>
    );
  }
}

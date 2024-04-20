"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Query
import { useGetDataTatooCareById } from "@/app/query/tattoo-care/useGetTattooCareById";
//Type
import { Tattoocare } from "@/app/types/type";
import BreadCrumb from "@/components/breadcrumb";
import { UpdateFormTattooCare } from "../_compoments/forms/update";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<Tattoocare | null>(null);

  //useQuery
  const { data: TattooCare, isLoading } = useGetDataTatooCareById(
    params.id.toString(),
  );

  const breadcrumbItems = [
    { title: "Tattoo Care", link: "/backend/tattoo-care" },
    { title: "Update", link: "#" },
  ];

  useEffect(() => {
    const data = TattooCare as Tattoocare;
    setInitialData(data);
  }, [TattooCare, isLoading]);

  console.log("initialDatđssss:", initialData);

  if (initialData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UpdateFormTattooCare initialData={initialData} key={null} />
      </div>
    );
  }
}

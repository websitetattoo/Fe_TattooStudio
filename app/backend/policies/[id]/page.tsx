"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BreadCrumb from "@/components/breadcrumb";
import { useGetDataProductById } from "@/app/query/policies/useGetPoliesById";
import { Policies } from "@/app/types/type";
import { UpdateForm } from "../_components/forms/update";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<Policies | null>(null);

  //useQuery
  const { data: policies, isLoading } = useGetDataProductById(
    params.id.toString(),
  );

  const breadcrumbItems = [
    { title: "Policies", link: "/backend/policies" },
    { title: "Update", link: "#" },
  ];

  useEffect(() => {
    const data = policies as Policies;
    setInitialData(data);
  }, [policies, isLoading]);

  if (initialData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UpdateForm initialData={initialData} key={null} />
      </div>
    );
  }
}

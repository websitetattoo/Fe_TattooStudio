"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Query
import { useGetDataPolicyById } from "@/app/query/policies/useGetPolicyById";
//Type
import { Policies } from "@/app/types/type";
import BreadCrumb from "@/components/breadcrumb";
import { UpdateForm } from "../_components/forms/update";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<Policies | null>(null);

  //useQuery
  const { data: policies, isLoading } = useGetDataPolicyById(
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

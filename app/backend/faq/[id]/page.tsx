"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Query
import { useGetDataFaqById } from "@/app/query/faq/useGetFaqById";
//Type
import { Faq } from "@/app/types/type";
import BreadCrumb from "@/components/breadcrumb";
import { UpdateFormFaq } from "../_compoments/forms/update";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<Faq | null>(null);

  //useQuery
  const { data: Faq, isLoading } = useGetDataFaqById(params.id.toString());

  const breadcrumbItems = [
    { title: "Faq", link: "/backend/faq" },
    { title: "Update", link: "#" },
  ];

  useEffect(() => {
    const data = Faq as Faq;
    setInitialData(data);
  }, [Faq, isLoading]);

  console.log("initialDatđssss:", initialData);

  if (initialData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UpdateFormFaq initialData={initialData} key={null} />
      </div>
    );
  }
}

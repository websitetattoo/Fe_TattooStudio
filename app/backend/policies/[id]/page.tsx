"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BreadCrumb from "@/components/breadcrumb";
import { PolicyForm } from "@/components/forms/policy-form";
import { Policies } from "@/constants/data";
import http from "@/lib/http";

export default function Page() {
  const params = useParams();
  // dùng loading để cải thiện giao diện người dùng
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<Policies | null>(null);
  const breadcrumbItems = [
    { title: "Policies", link: "/backend/policies" },
    { title: "Update", link: "#" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await http.get(`/policies/${params.id}`);
        const data = response.data as Policies;
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching policy:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PolicyForm initialData={initialData} key={null} />
    </div>
  );
}

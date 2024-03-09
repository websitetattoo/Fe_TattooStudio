"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const breadcrumbItems = [
    { title: "Policies", link: "/backend/policies" },
    params.policiesId
      ? { title: "Update", link: "/backend/policies/update" }
      : { title: "Create", link: "/backend/policies/create" },
  ];
  useEffect(() => {
    if (params.policiesId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `http://localhost:3001/policies/${params.policiesId}`,
          );
          setInitialData(response.data);
        } catch (error) {
          console.error("Error fetching policy:", error);
          return null;
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [params.policiesId]);
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      {!isLoading && (
        <ProductForm
          initialData={params.policiesId ? initialData : null}
          key={null}
        />
      )}
    </div>
  );
}

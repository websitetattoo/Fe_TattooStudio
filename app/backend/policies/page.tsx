"use client";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { PoliciesClient } from "@/components/tables/policy-tables/policies";
import http from "@/lib/http";
import { Policies } from "@/constants/data";

const breadcrumbItems = [{ title: "Policies", link: "/backend/policies" }];

export default function Index() {
  const [policies, setPolicies] = useState<Policies[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/policies");
        const data = response.data as Policies[];
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PoliciesClient data={policies} />
    </div>
  );
}

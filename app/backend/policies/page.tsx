"use client";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { PoliciesClient } from "@/components/tables/policy-tables/policies";
import http from "@/lib/http";
import { Policies } from "@/constants/data";
import { LoadingIcon } from "@/components/forms/icons";
import { RoundSpinner } from "@/components/ui/spinner";

const breadcrumbItems = [{ title: "Policies", link: "/backend/policies" }];

export default function Index() {
  const [policies, setPolicies] = useState<Policies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/policies");
        const data = response.data as Policies[];
        setPolicies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching policies:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Callback function to update policies
  const onRefresh = (updatedPolicies: Policies[]) => {
    setPolicies(updatedPolicies);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <RoundSpinner className="h-16 w-full" size="xl" />
      </div>
    );
  }
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PoliciesClient data={policies} onRefresh={onRefresh} />
    </div>
  );
}

"use client";
import React from "react";

import BreadCrumb from "@/components/breadcrumb";
import { PolicyForm } from "@/components/forms/policy-form";

export default function Page() {
  const breadcrumbItems = [
    { title: "Policies", link: "/backend/policies" },
    { title: "Create", link: "#" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <PolicyForm initialData={null} key={null} />
    </div>
  );
}

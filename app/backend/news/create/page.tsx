"use client";
import React from "react";

import BreadCrumb from "@/components/breadcrumb";
import { PolicyForm } from "@/app/backend/forms/policy-form";
import { NewsForm } from "@/app/backend/forms/news-form";

export default function Page() {
  const breadcrumbItems = [
    { title: "News", link: "/backend/news" },
    { title: "Create", link: "#" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <NewsForm initialData={null} key={null} />
    </div>
  );
}

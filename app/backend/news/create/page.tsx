"use client";
import React from "react";

import BreadCrumb from "@/components/breadcrumb";
import { NewsForm } from "@/app/backend/news/_components/forms/create-update-form";

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

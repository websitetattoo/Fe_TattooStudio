"use client";
import React from "react";

import BreadCrumb from "@/components/breadcrumb";
import { UpdateFormFaq } from "../_compoments/forms/update";

export default function Page() {
  const breadcrumbItems = [
    { title: "Faq", link: "/backend/faq" },
    { title: "Create", link: "#" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UpdateFormFaq initialData={null} key={null} />
    </div>
  );
}

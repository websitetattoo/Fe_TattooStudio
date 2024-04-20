"use client";
import React from "react";

import BreadCrumb from "@/components/breadcrumb";
import { UpdateFormTattooCare } from "../_compoments/forms/update";

export default function Page() {
  const breadcrumbItems = [
    { title: "Tattoo Care", link: "/backend/tattoo-care" },
    { title: "Create", link: "#" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UpdateFormTattooCare initialData={null} key={null} />
    </div>
  );
}

"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Components
import BreadCrumb from "@/components/breadcrumb";
//Forms
import { NewsForm } from "@/app/backend/news/_components/forms/create-update-form";
//Types
import { News } from "@/app/types/type";
import { get } from "@/lib/http";

export default function Page() {
  const params = useParams();

  // dùng loading để cải thiện giao diện người dùng
  const [initialData, setInitialData] = useState<News | null>(null);
  const breadcrumbItems = [
    { title: "News", link: "/backend/news" },
    { title: "Update", link: "#" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`/news/${params.id}`);
        const data = response.data as News;
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        return null;
      } finally {
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <NewsForm initialData={initialData} key={null} />
    </div>
  );
}

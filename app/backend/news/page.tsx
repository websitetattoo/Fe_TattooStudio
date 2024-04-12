"use client";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { get } from "@/lib/http";
import { RoundSpinner } from "@/components/ui/spinner";
import { News } from "@/app/types/type";
import { NewsClient } from "./_components/tables";

const breadcrumbItems = [{ title: "News", link: "/backend/news" }];

export default function Index() {
  const [news, setNews] = useState<News[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/news");
        const data = response.data as News[];
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Callback function to update news
  const onRefresh = async () => {
    try {
      const response = await get("/news");
      const data = response.data as News[];
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  console.log(news);
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
      <NewsClient data={news} onRefresh={onRefresh} />
    </div>
  );
}

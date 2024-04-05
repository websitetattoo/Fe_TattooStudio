"use client";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import http from "@/lib/http";
import { Policies } from "@/constants/data";
import { RoundSpinner } from "@/components/ui/spinner";
import { NewsClient } from "@/components/tables/news-tables/news";
import { News } from "@/components/tables/news-tables/type/news";

const breadcrumbItems = [{ title: "News", link: "/backend/news" }];

export default function Index() {
  const [news, setNews] = useState<News[]>([]);

  const newsTest: News[] = [
    {
      image:
        "http://localhost:3000/_next/image?url=%2Fimages%2Fnews-1.jpg&w=750&q=75",
      title: "Title 1",
      content: "Content 1",
      createdDate: new Date("2024-03-29"), // Định dạng ngày tháng năm
    },
    {
      image:
        "http://localhost:3000/_next/image?url=%2Fimages%2Fnews-1.jpg&w=750&q=75",
      title: "Title 2",
      content: "Content 2",
      createdDate: new Date("2024-03-28"), // Định dạng ngày tháng năm
    },
    {
      image:
        "http://localhost:3000/_next/image?url=%2Fimages%2Fnews-1.jpg&w=750&q=75",
      title: "Title 3",
      content: "Content 3",
      createdDate: new Date("2024-03-27"), // Định dạng ngày tháng năm
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/news");
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
      const response = await http.get("/news");
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

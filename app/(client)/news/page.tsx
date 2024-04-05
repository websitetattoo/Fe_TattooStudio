"use client";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import NewsCard from "./_components/news-card";
import { useEffect, useState } from "react";
import http from "@/lib/http";
import { RoundSpinner } from "@/components/ui/spinner";

export default function index() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy dữ liệu Tin Tức từ dưới Database
  const fetchData = async () => {
    try {
      const response = await http.get("/news");
      const data = response.data;
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Nếu đang trong quá trình loading thì show icon loading ...
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <RoundSpinner className="h-16 w-full" size="xl" />
      </div>
    );
  }

  return (
    <div className="bg-tattoo-color-bg ">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <PageTitle>
          <HighlightText>NEWS</HighlightText>
        </PageTitle>
      </div>
      <div className=" -bottom-10 h-full w-full  flex-wrap  justify-center py-24 pt-12 md:flex  md:p-20 lg:flex">
        {news?.map((item: any, index) => {
          console.log(item);
          const itemID = item._id;
          console.log(itemID);
          return (
            <div key={index} className="w-full p-4 py-12 md:w-10/12 lg:w-6/12">
              <NewsCard itemID={itemID} imgObj={item} disabled={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

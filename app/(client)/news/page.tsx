"use client";

import { useEffect, useState } from "react";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import NewsCard from "./_components/news-card";
import { Data, News } from "@/app/types/type";
import { useGetDataNews } from "@/app/query/news/useGetAllNews";
import { PaginationComponent } from "@/app/backend/Common/pagination";

export default function index() {
  const [news, setNews] = useState<News[]>([]);
  const filterDataApi = {};

  const { data, isLoading: loading } = useGetDataNews(filterDataApi);
  useEffect(() => {
    const dataNews = (data as Data)?.data as News[];
    setNews(dataNews);
  }, [data]);

  return (
    <div className="bg-tattoo-color-bg bg-transparent">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <PageTitle>
          <HighlightText>NEWS</HighlightText>
        </PageTitle>
      </div>
      <div className="-bottom-10 h-full w-full  flex-wrap justify-start py-24 pt-12 md:flex md:p-20 lg:flex">
        {news?.map((item: any, index: number) => (
          <div className="start-0 w-full p-4 py-12 lg:w-6/12" key={index}>
            <NewsCard imgObj={item} itemID={item._id} />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import NewsCard from "./_components/news-card";
import { Data, News } from "@/app/types/type";
import { useGetDataNews } from "@/app/query/news/useGetAllNews";
import { PaginationComponent } from "@/components/pagination";

export default function index() {
  const [news, setNews] = useState<News[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const filterDataApi = {
    page: currentPage,
    pageSize: currentPageSize,
  };
  const { data, isLoading: loading } = useGetDataNews(filterDataApi);
  useEffect(() => {
    const dataNews = (data as Data)?.data as News[];
    setNews(dataNews);
  }, [data]);

  //Định nghĩa các hàm xử lý - Begin add
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChangeSize = (pageSize: number) => {
    setCurrentPageSize(pageSize);
    setCurrentPage(1);
  };
  //Định nghĩa các hàm xử lý - End add

  const propsPage = {
    pageSize: currentPageSize,
    total: (data as Data)?.total ?? 0,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageChangeSize,
    className: "text-white",
  };

  return (
    <div className="bg-tattoo-color-bg bg-transparent">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <PageTitle>
          <HighlightText>NEWS</HighlightText>
        </PageTitle>
      </div>
      <div className=" -bottom-10 h-full w-full  flex-wrap  justify-start py-24 pt-12 md:flex  md:p-20 lg:flex">
        {news?.map((item: any, index: number) => (
          <div className="start-0 w-full p-4 py-12 md:w-10/12 lg:w-6/12">
            <NewsCard key={index} imgObj={item} itemID={item._id} />
          </div>
        ))}
      </div>

      <PaginationComponent propsPage={propsPage} />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { get } from "@/lib/http";
import { RoundSpinner } from "@/components/ui/spinner";
import { Data, News } from "@/app/types/type";
import { NewsTables } from "./_components/tables";
import { useGetDataNews } from "@/app/query/news/useGetAllNews";
import { PaginationComponent } from "../../../components/pagination";

const breadcrumbItems = [{ title: "News", link: "/backend/news" }];

export default function Index() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const filterDataApi = {
    page: currentPage,
    pageSize: currentPageSize,
  };
  const { data, isLoading: loading } = useGetDataNews(filterDataApi);

  useEffect(() => {
    const dataPolicy = (data as Data)?.data as News[];
    setNews(dataPolicy);
    setIsLoading(loading);
  }, [data, isLoading]);

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
  };

  return (
    <>
      {!loading && Array.isArray(news) ? (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <NewsTables data={news} total={(data as Data)?.total ?? 0} />
          <PaginationComponent propsPage={propsPage} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <RoundSpinner className="h-16 w-full" size="xl" />
        </div>
      )}
    </>
  );
}

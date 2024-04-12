"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { get } from "@/lib/http";
import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import NewsCard from "./_components/news-card";
import { RoundSpinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

export default function index() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Example: Total number of pages
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // You can perform additional actions here, such as fetching data for the new page
    // fetchData(page);
  };
  const { data, isLoading, isError, isFetching } = useQuery(
    ["news", currentPage],
    () => fetchNews(currentPage),
    {
      keepPreviousData: true,
      staleTime: 60000, // 1 minute
    },
  );

  useEffect(() => {
    if (!isLoading && data?.hasMore) {
      queryClient.prefetchQuery(["news", currentPage + 1], () =>
        fetchNews(currentPage + 1),
      );
    }
  }, [data, isLoading, currentPage, queryClient]);
  const fetchNews = async (pageNum: number) => {
    const response = await get(`/news?page=${pageNum}&limit=${PAGE_SIZE}`);
    return response.data;
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  if (isError) {
    return <div>Error fetching news data</div>;
  }

  // Gọi API lấy dữ liệu Tin Tức từ dưới Database
  // const fetchData = async () => {
  //   try {
  //     const response = await http.get("/news");
  //     const data = response.data;
  //     setNews(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching news:", error);
  //     setLoading(false);
  //   }
  // };

  // Nếu đang trong quá trình loading thì show icon loading ...
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <RoundSpinner className="h-16 w-full" size="xl" />
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching news data</div>;
  }

  return (
    <div className="bg-tattoo-color-bg ">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <PageTitle>
          <HighlightText>NEWS</HighlightText>
        </PageTitle>
      </div>
      <div className=" -bottom-10 h-full w-full  flex-wrap  justify-center py-24 pt-12 md:flex  md:p-20 lg:flex">
        {data?.map((item: any, index: number) => (
          <div className="w-full p-4 py-12 md:w-10/12 lg:w-6/12">
            <NewsCard key={index} imgObj={item} itemID={item._id} />
          </div>
        ))}
      </div>
      <Pagination className="p-8 text-slate-400" aria-label="Pagination">
        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
        <PaginationContent>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (page === 2 && currentPage > 3) {
              return <PaginationEllipsis key={page} />;
            } else if (
              page === totalPages - 1 &&
              currentPage < totalPages - 2
            ) {
              return <PaginationEllipsis key={page} />;
            } else {
              return null;
            }
          })}
        </PaginationContent>
        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
}

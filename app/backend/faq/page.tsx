"use client";
//Libary
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { useGetDataFaq } from "@/app/query/faq/useGetAllFaq";

import { RoundSpinner } from "@/components/ui/spinner";
import { Data, Faq } from "@/app/types/type";
import { FaqTables } from "./_compoments/tables";
import { PaginationComponent } from "@/app/backend/Common/pagination";

export default function Index() {
  const breadcrumbItems = [{ title: "Faq", link: "/backend/faq" }];
  const [faq, setfaq] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(25);
  const filterDataApi = {
    page: currentPage,
    pageSize: currentPageSize,
  };

  const { data, isLoading: loading } = useGetDataFaq(filterDataApi);
  useEffect(() => {
    const datafaq = (data as Data)?.data as Faq[];
    setfaq(datafaq);
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
      {!loading && Array.isArray(faq) ? (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <FaqTables data={faq} total={(data as Data)?.total ?? 0} />
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

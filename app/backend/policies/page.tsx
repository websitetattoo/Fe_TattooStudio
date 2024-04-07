"use client";
//Libary
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
import { useGetDataPolicies } from "@/app/query/policies/useGetAllPolices";
import { PoliciesTables } from "./_components/tables";
import { RoundSpinner } from "@/components/ui/spinner";
import { Policies } from "@/app/types/type";
import { PaginationComponent } from "../UI/Pagination";

export default function Index() {
  const breadcrumbItems = [{ title: "Policies", link: "/backend/policies" }];
  const [policies, setPolicies] = useState<Policies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const filterDataApi = {
    page: currentPage,
    pageSize: 3,
  };

  const { data, isLoading: loading } = useGetDataPolicies(filterDataApi);
  useEffect(() => {
    const dataPolicy = data?.data as Policies[];
    setPolicies(dataPolicy);
    setIsLoading(loading);
  }, [data, isLoading]);

  //Định nghĩa các hàm xử lý - Begin add
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //Định nghĩa các hàm xử lý - End add
  const propsPage = {
    pageSize: 3,
    total: data?.total,
    onPageChange: handlePageChange,
  };

  return (
    <>
      {!loading && Array.isArray(policies) ? (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <PoliciesTables data={policies} total={data?.total} />
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

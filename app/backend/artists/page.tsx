"use client";

//Libary
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";

import { RoundSpinner } from "@/components/ui/spinner";
import { Data, Artist } from "@/app/types/type";
import { ArtistTables } from "./_compoments/tables";
import { PaginationComponent } from "@/app/backend/Comon/pagination";
import { useGetDataArtist } from "@/app/query/artist/useGetAllArtist";

export default function Index() {
  const breadcrumbItems = [{ title: "Artist", link: "/backend/Artist" }];
  const [Artist, setArtist] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const filterDataApi = {
    page: currentPage,
    pageSize: currentPageSize,
  };

  const { data, isLoading: loading } = useGetDataArtist(filterDataApi);
  useEffect(() => {
    const dataArtist = (data as Data)?.data as Artist[];
    setArtist(dataArtist);
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
      {!loading && Array.isArray(Artist) ? (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <ArtistTables data={Artist} total={(data as Data)?.total ?? 0} />
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

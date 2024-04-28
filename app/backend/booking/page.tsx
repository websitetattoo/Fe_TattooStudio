"use client";
//Libary
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/breadcrumb";
//Query
import { useGetDataBooking } from "@/app/query/booking/useGetAllBooking";

import { RoundSpinner } from "@/components/ui/spinner";
import { Booking, Data } from "@/app/types/type";
import { BookingTables } from "./_compoments/tables";
import { PaginationComponent } from "@/components/pagination";

export default function Index() {
  const breadcrumbItems = [{ title: "Booking", link: "/backend/booking" }];
  const [booking, setBooking] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const filterDataApi = {
    page: currentPage,
    pageSize: currentPageSize,
    arrType: {
      artist: "artist",
    },
  };

  const { data, isLoading: loading } = useGetDataBooking(filterDataApi);

  useEffect(() => {
    const databooking = (data as Data)?.data as Booking[];
    const newBookingData = databooking?.map((item: any) => {
      const dateValue = new Date(item.schedule);
      const schedule = dateValue.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      let artistName =
        typeof item.artist === "object" && item.artist
          ? item.artist.name
          : item.artist;
      return {
        ...item,
        schedule: schedule,
        artist: artistName,
      };
    }) as Booking[];
    setBooking(newBookingData);
  }, [data, loading]);

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
      {!loading && Array.isArray(booking) ? (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <BookingTables data={booking} total={(data as Data)?.total ?? 0} />
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

"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Query
import { useGetDataBookingById } from "@/app/query/booking/useGetBookingByID";
//Type
import { Booking } from "@/app/types/type";
import BreadCrumb from "@/components/breadcrumb";
import { ViewBooking } from "../_compoments/forms/view";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<Booking | null>(null);
  const filterDataApi = {
    arrType: {
      artist: "artist",
    },
  };

  //useQuery
  const { data: Faq, isLoading } = useGetDataBookingById(
    params.id.toString(),
    filterDataApi,
  );

  const breadcrumbItems = [
    { title: "booking", link: "/backend/booking" },
    { title: "View", link: "#" },
  ];

  useEffect(() => {
    const data = Faq as Booking;
    setInitialData(data);
  }, [Faq, isLoading]);

  if (initialData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ViewBooking initialData={initialData} key={null} />
      </div>
    );
  }
}

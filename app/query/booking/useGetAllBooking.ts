"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllBooking } from "@/app/service/apis/booking.api";
//Types
import { filterBookingData } from "@/app/types/type";

export const useGetDataBooking = (filterDataApi?: filterBookingData) => {
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_BOOKING],
      () => getAllBooking(),
      {
        keepPreviousData: true,
        staleTime: 5 * 1000,
      },
    );
    return { data, isLoading };
  }

  const { page, pageSize } = filterDataApi;
  const queryClient = useQueryClient();

  if (page !== undefined && pageSize !== undefined) {
    const { page: currentPage, ...other } = filterDataApi;
    if (currentPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(
        [QUERIES_KEYS.GET_BOOKING, { page: nextPage, ...other }],
        () => getAllBooking({ page: nextPage, ...other }),
      );
    }
  }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_BOOKING, filterDataApi],
    () => getAllBooking(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};

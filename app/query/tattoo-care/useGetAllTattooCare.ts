"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllTattooCare } from "@/app/service/apis/tattooCare.api";
//Types
import { filterTattooCareData } from "@/app/types/type";

export const useGetDataTatooCare = (filterDataApi?: filterTattooCareData) => {
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_TATOOCARE],
      () => getAllTattooCare(),
      {
        keepPreviousData: true,
        staleTime: 5 * 1000,
      },
    );
    return { data, isLoading };
  }

  const { page, pageSize } = filterDataApi;
  const queryClient = useQueryClient();

  // if (page !== undefined && pageSize !== undefined) {
  //   const { page: currentPage, ...other } = filterDataApi;
  //   if (currentPage) {
  //     const nextPage = currentPage + 1;
  //     queryClient.prefetchQuery(
  //       [QUERIES_KEYS.GET_TATOOCARE, { page: nextPage, ...other }],
  //       () => getAllTattooCare({ page: nextPage, ...other }),
  //     );
  //   }
  // }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_TATOOCARE, filterDataApi],
    () => getAllTattooCare(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};

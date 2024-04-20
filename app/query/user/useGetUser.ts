"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
//Types
import { filterData } from "@/app/types/type";
import { getUser } from "@/app/service/apis/user.api";

export const useGetDataUser = (filterDataApi?: filterData) => {
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_USER],
      () => getUser(),
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
        [QUERIES_KEYS.GET_POLICIES, { page: nextPage, ...other }],
        () => getUser({ page: nextPage, ...other }),
      );
    }
  }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_USER, filterDataApi],
    () => getUser(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};

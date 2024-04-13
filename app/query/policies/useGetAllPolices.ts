"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllPolicies } from "@/app/service/apis/policies.api";
//Types
import { filterPolicesData } from "@/app/types/type";

export const useGetDataPolicies = (filterDataApi?: filterPolicesData) => {
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_POLICIES],
      () => getAllPolicies(),
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
        () => getAllPolicies({ page: nextPage, ...other }),
      );
    }
  }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_POLICIES, filterDataApi],
    () => getAllPolicies(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};

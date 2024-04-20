"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllNews } from "@/app/service/apis/news.api";
//Types
import { filterData } from "@/app/types/type";

export const useGetDataNews = (filterDataApi?: filterData) => {
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_NEWS],
      () => getAllNews(),
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
        [QUERIES_KEYS.GET_NEWS, { page: nextPage, ...other }],
        () => getAllNews({ page: nextPage, ...other }),
      );
    }
  }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_NEWS, filterDataApi],
    () => getAllNews(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};

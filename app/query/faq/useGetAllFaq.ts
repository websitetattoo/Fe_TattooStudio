"use client";
// Libraries
import { useQuery } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllFaq } from "@/app/service/apis/faq.api";
//Types
import { filterFaqData } from "@/app/types/type";

export const useGetDataFaq = (filterDataApi?: filterFaqData) => {
  if (!filterDataApi) {
    const { data, isLoading } = useQuery(
      [QUERIES_KEYS.GET_FAQ],
      () => getAllFaq(),
      {
        keepPreviousData: true,
        staleTime: 5 * 1000,
      },
    );
    return { data, isLoading };
  }

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_FAQ, filterDataApi],
    () => getAllFaq(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  );

  return { data, isLoading };
};

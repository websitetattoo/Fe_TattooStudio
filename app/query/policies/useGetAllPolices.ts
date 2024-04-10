"use client";
// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getAllPolicies } from "@/app/service/apis/policies.api";
//Types
import { filterPolicesData } from "@/app/types/type";

export const useGetDataPolicies = (filterDataApi: filterPolicesData) => {
  const { page, pageSize } = filterDataApi;
  const queryClient = useQueryClient();

  if (page !== undefined && pageSize !== undefined) {
    const { page: currentPage, ...other } = filterDataApi;
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(
      [QUERIES_KEYS.GET_POLICIES, { page: nextPage, ...other }],
      () => getAllPolicies({ page: nextPage, ...other }),
    );
  }

  const { data: cachedData, isLoading: isCachedLoading } = useQuery(
    [QUERIES_KEYS.GET_POLICIES, filterDataApi],
    () => queryClient.getQueryData([QUERIES_KEYS.GET_POLICIES, filterDataApi]),
    {
      enabled: false,
    },
  );

  const { data, isLoading, isError } = useQuery(
    [QUERIES_KEYS.GET_POLICIES, filterDataApi],
    () => getAllPolicies(filterDataApi),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
      // Chỉ kích hoạt truy vấn nếu không có dữ liệu được lưu trong bộ nhớ đệm
      enabled: !cachedData,
    },
  );

  // Trả về dữ liệu đã lưu trong bộ nhớ cache nếu nó có sẵn và không tải
  if (!isLoading && !isError && cachedData) {
    return { data: cachedData, isLoading: isCachedLoading };
  }
  return { data, isLoading };
};

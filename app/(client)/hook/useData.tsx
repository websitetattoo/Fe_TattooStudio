import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import http from "@/lib/http";

interface DataResponse {
  // Define your data structure here
}

export function useData(type: string) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch function for getting data from the API
  const fetchData = async (page: number) => {
    const response = await http.get(`/${type}?page=${page}`);
    return response.data as DataResponse;
  };

  // Initial fetch when the component mounts
  const { data, isLoading, isError } = useQuery(
    [type, currentPage],
    () => fetchData(currentPage),
    {
      staleTime: 60000, // 1 minute
    },
  );

  // Prefetch function to prefetch the next page
  const prefetchData = (page: number) => {
    queryClient.prefetchQuery([type, page], () => fetchData(page));
  };

  // Function to fetch next page
  const fetchNextPage = () => {
    const nextPage = currentPage + 1;
    if (!isLoading && !isError && data && data.hasMore) {
      // Check if there are more pages available
      setCurrentPage(nextPage); // Update current page state
      prefetchData(nextPage);
    }
  };

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
  };
}

// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getNewsById } from "@/app/service/apis/news.api";

export const useGetDataNewsById = (id: string) => {
  const queryClient = useQueryClient();

  const { data: cachedData, isLoading: isCachedLoading } = useQuery(
    [QUERIES_KEYS.GET_NEWS, id],
    () => queryClient.getQueryData([QUERIES_KEYS.GET_NEWS, id]),
    {
      enabled: false,
    },
  );

  const { data, isLoading, isError } = useQuery(
    [QUERIES_KEYS.GET_NEWS, id],
    () => getNewsById(id),
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

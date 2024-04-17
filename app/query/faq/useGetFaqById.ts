// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getFaqById } from "@/app/service/apis/faq.api";

export const useGetDataFaqById = (id: string) => {
  const queryClient = useQueryClient();

  const { data: cachedData, isLoading: isCachedLoading } = useQuery(
    [QUERIES_KEYS.GET_FAQ, id],
    () => queryClient.getQueryData([QUERIES_KEYS.GET_FAQ, id]),
    {
      enabled: false,
    },
  );

  const { data, isLoading, isError } = useQuery(
    [QUERIES_KEYS.GET_FAQ, id],
    () => getFaqById(id),
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

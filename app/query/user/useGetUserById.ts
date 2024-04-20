// Libraries
import { useQuery, useQueryClient } from "react-query";
// Constants
import { QUERIES_KEYS } from "@/constants/queries";
// Services
import { getUserById } from "@/app/service/apis/user.api";

export const useGetDataUserById = (id: string) => {
  const queryClient = useQueryClient();

  const { data: cachedData, isLoading: isCachedLoading } = useQuery(
    [QUERIES_KEYS.GET_USER, id],
    () => queryClient.getQueryData([QUERIES_KEYS.GET_USER, id]),
    {
      enabled: false,
    },
  );

  const { data, isLoading, isError } = useQuery(
    [QUERIES_KEYS.GET_USER, id],
    () => getUserById(id),
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

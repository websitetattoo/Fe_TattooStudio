// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { updateNews } from "@/app/service/apis/news.api";
import { QUERIES_KEYS } from "@/constants/queries";
import { TypeFormPostNews } from "@/app/types/type";

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (news: TypeFormPostNews) => updateNews(news),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_NEWS]);
      toast({
        title: "Updated News Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
      });
    },
  });

  return {
    mutationUpdate: mutation,
    isLoadingUpdate: mutation.isLoading,
  };
};

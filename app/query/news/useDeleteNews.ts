// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Services
import { QUERIES_KEYS } from "@/constants/queries";
import { deleteNews } from "@/app/service/apis/news.api";

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: string) => deleteNews(id),
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.GET_NEWS],
      });
      router.push("/backend/news");
      toast({
        title: "Deleted News Successfully",
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
    mutationDelete: mutation,
    isLoadingDelete: mutation.isLoading,
  };
};

// Libraries
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { createNews } from "@/app/service/apis/news.api";
import { TypeFormPostNews } from "@/app/types/type";

export const useCreateNews = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (News: TypeFormPostNews) => createNews(News),
    onSuccess: () => {
      // Hiện thông báo lưu thành công
      toast({
        title: "Create News Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
      });
    },
    onMutate: () => {},
  });

  return {
    mutationCreate: mutation,
    isLoading: mutation.isLoading,
  };
};

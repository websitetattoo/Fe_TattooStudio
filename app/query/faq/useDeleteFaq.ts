// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Services
import { deleteFaq } from "@/app/service/apis/faq.api";
import { QUERIES_KEYS } from "@/constants/queries";

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: string) => deleteFaq(id),
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.GET_FAQ],
      });
      router.push("/backend/faq");
      toast({
        title: "Deleted Faq Successfully",
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

// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Services
import { QUERIES_KEYS } from "@/constants/queries";
import { deleteTattooCare } from "@/app/service/apis/tattooCare.api";

export const useDeleteTattooCare = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: string) => deleteTattooCare(id),
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.GET_TATOOCARE],
      });
      router.push("/backend/tattoo-care");
      toast({
        title: "Deleted TattooCare Successfully",
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

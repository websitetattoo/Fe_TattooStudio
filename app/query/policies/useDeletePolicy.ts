// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Services
import { QUERIES_KEYS } from "@/constants/queries";
import { deletePolicy } from "@/app/service/apis/policies.api";

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: string) => deletePolicy(id),
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.GET_POLICIES],
      });
      router.push("/backend/policies");
      toast({
        title: "Deleted Policy Successfully",
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

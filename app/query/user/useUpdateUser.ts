// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { updateUser } from "@/app/service/apis/user.api";
import { QUERIES_KEYS } from "@/constants/queries";
import { TypeFormUpdateUser } from "@/app/types/type";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (user: TypeFormUpdateUser) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_USER]);
      toast({
        title: "Updated User Successfully",
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

// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { updatePolicy } from "@/app/service/apis/policies.api";
import { QUERIES_KEYS } from "@/constants/queries";
import { TypeFormPostPolicy } from "@/app/types/type";

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (policy: TypeFormPostPolicy) => updatePolicy(policy),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_POLICIES]);
      toast({
        title: "Updated Policy Successfully",
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

// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { updateTattooCare } from "@/app/service/apis/tattooCare.api";

import { QUERIES_KEYS } from "@/constants/queries";
import { TypeFormPostTattooCare } from "@/app/types/type";

export const useUpdateTattooCare = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (TattooCare: TypeFormPostTattooCare) =>
      updateTattooCare(TattooCare),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_TATOOCARE]);
      toast({
        title: "Updated TattooCare Successfully",
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

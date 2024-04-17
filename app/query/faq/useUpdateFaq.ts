// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { updateFaq } from "@/app/service/apis/faq.api";

import { QUERIES_KEYS } from "@/constants/queries";
import { TypeFormPostFaq } from "@/app/types/type";

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (Faq: TypeFormPostFaq) => updateFaq(Faq),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_FAQ]);
      toast({
        title: "Updated Faq Successfully",
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

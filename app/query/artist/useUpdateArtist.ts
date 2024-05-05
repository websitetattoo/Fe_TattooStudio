// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { updateArtist } from "@/app/service/apis/artist.api";
//Types
import { TypeFormPostArtist } from "@/app/types/type";
import { QUERIES_KEYS } from "@/constants/queries";

export const useUpdateArtist = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (Faq: TypeFormPostArtist) => updateArtist(Faq),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_ARTIST]);
      toast({
        title: "Updated Artist Successfully",
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

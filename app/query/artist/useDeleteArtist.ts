// Libraries
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Services
import { deleteArtist } from "@/app/service/apis/artist.api";
import { QUERIES_KEYS } from "@/constants/queries";

export const useDeleteArtist = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (id: string) => deleteArtist(id),
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.GET_ARTIST],
      });
      router.push("/backend/artists");
      toast({
        title: "Deleted Artist Successfully",
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

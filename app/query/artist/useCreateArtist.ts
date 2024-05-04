// Libraries
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { createArtist } from "@/app/service/apis/artist.api";
//Types
import { TypeFormPostArtist } from "@/app/types/type";

export const useCreateArtist = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (Artist: TypeFormPostArtist) => createArtist(Artist),
    onSuccess: () => {
      // Hiện thông báo lưu thành công
      toast({
        title: "Created Artist Successfully",
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
    mutationCreate: mutation,
    isLoading: mutation.isLoading,
  };
};

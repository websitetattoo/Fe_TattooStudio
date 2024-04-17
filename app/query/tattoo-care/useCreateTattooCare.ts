// Libraries
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { createTatooCare } from "@/app/service/apis/tattooCare.api";
//Types
import { TypeFormPostPolicy } from "@/app/types/type";

export const useCreateTatooCare = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (policy: TypeFormPostPolicy) => createTatooCare(policy),
    onSuccess: () => {
      // Hiện thông báo lưu thành công
      toast({
        title: "Create TatooCare Successfully",
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

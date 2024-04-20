// Libraries
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { createFaq } from "@/app/service/apis/faq.api";
//Types
import { TypeFormPostFaq } from "@/app/types/type";

export const useCreateFaq = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (faq: TypeFormPostFaq) => createFaq(faq),
    onSuccess: () => {
      // Hiện thông báo lưu thành công
      toast({
        title: "Create Faq Successfully",
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

// Libraries
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { createPolicy } from "@/app/service/apis/policies.api";
import { TypeFormPostPolicy } from "@/app/types/type";

export const useCreatePolicy = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (policy: TypeFormPostPolicy) => createPolicy(policy),
    onSuccess: () => {
      // Hiện thông báo lưu thành công
      toast({
        title: "Create Policy Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
      });
    },
    onMutate: () => {},
  });

  return {
    mutationCreate: mutation,
    isLoading: mutation.isLoading,
  };
};

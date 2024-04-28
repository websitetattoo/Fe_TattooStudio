// Libraries
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
// services
import { createBooking } from "@/app/service/apis/booking.api";
//Types
import { TypeFormPostBooking } from "@/app/types/type";

export const useCreateBooking = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (Booking: TypeFormPostBooking) => createBooking(Booking),
    onSuccess: () => {
      // Hiện thông báo lưu thành công
      toast({
        title: "Send Contact Successfully",
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

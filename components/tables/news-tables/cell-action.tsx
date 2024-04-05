"use client";
//Library
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
//....
import http from "@/lib/http";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modal/alert-modal";
import { ToastAction } from "@radix-ui/react-toast";
import { News } from "./type/news";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: News | any;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Nhấn confirm để gọi API xóa và gọi lại hàm onRefresh nếu delete thành công
  const onConfirm = async () => {
    try {
      setLoading(true);
      const response = await http.delete(`/news/${data._id}`);
      // Check if response data exists before logging
      if (response.data) {
        console.log(response.data);
      }
      onRefresh(); // Thực thi hàm onRefresh khi delete thành công
    } catch (error) {
      console.log(error);
      // Thông báo khi delete không thành công
      toast({
        title: "Something went wrong.",
        description: "Error delete news",
        action: (
          <div className="rounded bg-tattoo-color-bg p-2 text-white">
            <ToastAction altText="Try again">Try again</ToastAction>
          </div>
        ),
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={false}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/backend/news/${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { UploadFile } from "antd";
import { TypeFormPostImage } from "@/app/types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Hàm xử lý đầy ảnh lên cloudinary và trả về đường dẫn
export const uploadImage = async (data: any, image: UploadFile) => {
  try {
    const { id, parentId, status } = data;
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const uploadImageUrl = `${url}/Images`;
    const formData: TypeFormPostImage = {
      id,
      parentId,
      status,
      image,
    };

    const response = await axios.post(uploadImageUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải lên ảnh:", error);
    throw error;
  }
};

//Hàm chuyển đổi văn bản có chứa mã html => chuỗi thuần túy
export const stripHtmlTags = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

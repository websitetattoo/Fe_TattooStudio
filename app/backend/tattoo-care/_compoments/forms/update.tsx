"use client";
//Library
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Trash } from "lucide-react";
//Library UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/app/backend/modal/alert-modal";
import "react-quill/dist/quill.snow.css";
import { quillFormats, quillModules } from "@/app/backend/Comon/react-quiff";
//Query
import { useUpdateTattooCare } from "@/app/query/tattoo-care/useUpdateTattooCare";
import { useDeleteTattooCare } from "@/app/query/tattoo-care/useDeleteTattooCare";
//Types
import { TypeFormPostTattooCare } from "@/app/types/type";
import { useCreateTatooCare } from "@/app/query/tattoo-care/useCreateTattooCare";

interface UpdateFormProps {
  initialData: any | null;
}
// Lazy loading Editor khi nhập News Form để tránh lỗi
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export const UpdateFormTattooCare: React.FC<UpdateFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormPostTattooCare = {
    id: "",
    title: "",
    content: "",
  };
  const [formData, setFormData] =
    useState<TypeFormPostTattooCare>(initialPostFormData);
  const { mutationCreate, isLoading } = useCreateTatooCare();
  const { mutationDelete, isLoadingDelete } = useDeleteTattooCare();
  const { mutationUpdate, isLoadingUpdate } = useUpdateTattooCare();

  const title = `${initialData ? "Edit" : "Create"} Tattoo Care`;
  const description = `${initialData ? "Edit" : "Add a new"} Tattoo Care.`;
  const action = `${initialData ? "Save changes" : "Create"}`;

  console.log("initialData", initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: params?.id.toString(),
        title: initialData.title || "",
        content: initialData.content || "",
      });
    } else {
      setFormData(initialPostFormData);
    }
  }, [initialData]);

  // Xử lý validate cho các thẻ input
  const validateInput = (value: any): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (value.title.trim() === "") {
      errors.title = "Title can't be empty.";
    }
    const contentInsideQuiff = value.content.match(/<p>(.*?)<\/p>/)[1];
    // Kiểm tra nếu người dùng chỉ nhập khoảng trắng vào editor thì báo lỗi
    const constaint = /^\s*$/.test(contentInsideQuiff);
    if (
      !value ||
      !value.content.trim() ||
      constaint ||
      value.content.trim() === "<p><br></p>"
    ) {
      errors.content = "Content can't be empty.";
    }
    return errors;
  };

  // Định nghĩa các hàm xử lý -- Begin add
  // Hàm xử lý change input editor
  const onEditorStateChange = (newEditorState: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: newEditorState,
    }));
  };

  // Hàm xử lý submit form
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Data validation
    const errors = validateInput(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    // Định nghĩa data post lên
    let postData: TypeFormPostTattooCare = {
      id: formData.id,
      title: formData.title,
      content: formData.content,
    };

    if (initialData) {
      mutationUpdate.mutate(postData);
      setError({});
    } else {
      mutationCreate.mutate(postData);
      setFormData(initialPostFormData);
      setError({});
    }
  };

  // Hàm xử lý thay đổi trường biểu mẫu
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onDelete = async () => {
    try {
      mutationDelete.mutate(params?.id.toString());
    } catch (error: any) {
    } finally {
      setOpen(isLoadingDelete);
    }
  };
  // Định nghĩa các hàm xử lý -- End add

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoadingDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoadingDelete}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.title && (
            <div className="grid w-full">
              <div className="text-red-500">{error.title}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="title" className="col-span-1 pr-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              placeholder="Title policy"
            />
            <div className="FormMessage"></div>
          </div>
          {error && error.content && (
            <div className="grid w-full">
              <div className="text-red-500">{error.content}</div>
            </div>
          )}
          <div className="">
            <div className="mb-4">
              <label htmlFor="content">Content:</label>
            </div>
            <QuillEditor
              className="mb-4"
              value={formData.content}
              onChange={onEditorStateChange}
              modules={quillModules}
              formats={quillFormats}
            />
            <Button
              className="ml-auto rounded-md bg-black px-4 py-2 text-white"
              type="submit"
            >
              {action}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

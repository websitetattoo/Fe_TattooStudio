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
import CustomFileInput from "@/components/custom-choose-file";
import { RoundSpinner } from "@/components/ui/spinner";
//Query
import { useCreateNews } from "@/app/query/news/useCreateNews";
import { useDeleteNews } from "@/app/query/news/useDeleteNews";
import { useUpdateNews } from "@/app/query/news/useUpdateNews";
//Types
import { News, TypeFormPostNews } from "@/app/types/type";
//css
import "react-quill/dist/quill.snow.css";
import { quillFormats, quillModules } from "@/app/backend/Comon/react-quiff";
// Lazy loading Editor when go to News Form to avoid error
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface NewsFormProps {
  initialData: News | null;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData }) => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<{ [key: string]: string }>({});
  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormPostNews = {
    id: "",
    title: "",
    content: "",
    files: null,
    createdDate: new Date(),
  };
  const [formData, setFormData] =
    useState<TypeFormPostNews>(initialPostFormData);
  const { mutationCreate, isLoading } = useCreateNews();
  const { mutationDelete, isLoadingDelete } = useDeleteNews();
  const { mutationUpdate, isLoadingUpdate } = useUpdateNews();
  const title = initialData ? "Edit news" : "Create news";
  const description = initialData ? "Edit a news." : "  Add a news";
  const action = initialData ? "Save changes" : "Create";

  useEffect(() => {
    if (initialData) {
      const getFile = async () => {
        const file = await downloadFileFromClouDinary(initialData.image);
        setFormData({
          id: params?.id.toString(),
          files: file,
          title: initialData.title || "",
          content: initialData.content || "",
          createdDate: new Date(initialData.createdDate),
        });
        setImageUrl(initialData.image);
      };

      getFile();
    } else {
      setFormData(initialPostFormData);
    }
  }, [initialData]);

  // Xử lý validate cho các thẻ input
  const validateInput = (value: any): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (!value.files) {
      errors.files = "Image must be provided.";
    }
    if (value.title.trim() === "") {
      errors.title = "Title can't be empty.";
    }
    if (value.content.trim() === "" || value.content === "<p><br></p>") {
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
    let postData: TypeFormPostNews = {
      id: formData.id,
      title: formData.title,
      content: formData.content,
      files: formData.files,
      createdDate: formData.createdDate,
    };

    if (initialData) {
      mutationUpdate.mutate(postData);
      setError({});
    } else {
      mutationCreate.mutate(postData);
      setFormData(initialPostFormData);
      setImageUrl(null);
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
  // Hàm xử lý thay đổi file ảnh (1 ảnh)
  const handleFileChange = (file: File) => {
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        files: file,
      }));
      setError((prevErrors) => ({
        ...prevErrors,
        files: "", // Clear the error if a file is selected
      }));
      setImageUrl(URL.createObjectURL(file));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        files: null,
      }));
    }
  };
  // Hàm download ảnh từ cloudinary qua url
  // return file
  const downloadFileFromClouDinary = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      // Tạo đối tượng File từ blob
      const file = new File([blob], "filename.jpg", {
        type: blob.type,
        lastModified: new Date().getTime(),
      });

      // Trả về đối tượng file
      return file;
    } catch (error) {
      console.error("Error downloading file:", error);
      return null;
    }
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
    <main>
      {!isLoadingUpdate && !isLoading ? (
        <div>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={isLoadingDelete}
          />
          <div className="flex items-center justify-between">
            <div className="mb-10">
              <Heading title={title} description={description} />
            </div>
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
              {error && error.files && (
                <div className="grid w-full">
                  <div className="text-red-500">{error.files}</div>
                </div>
              )}
              <div className="grid md:grid-cols-8">
                <label htmlFor="file" className="col-span-1 pr-2">
                  Image:
                </label>
                <CustomFileInput
                  imageUrl={imageUrl}
                  onFileChange={handleFileChange}
                  error={error.files}
                  onSuccess={() => {
                    setImageUrl(null);
                  }}
                />
              </div>
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
                  className="border-input placeholder:text-muted-foreground focus-visible:ring-ring :font-medium col-span-7 rounded-md border bg-transparent 
              px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                  placeholder="Title News"
                />
                <div className="FormMessage"></div>
              </div>
              {error && error.subtitle && (
                <div className="grid w-full">
                  <div className="text-red-500">{error.subtitle}</div>
                </div>
              )}

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
        </div>
      ) : (
        <div className="flex h-full min-h-96 items-center justify-center ">
          <RoundSpinner className="h-16 w-full" size="xl" />
        </div>
      )}
    </main>
  );
};

"use client";
//Library
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Trash } from "lucide-react";
//Library UI
import { Button } from "@/components/ui/button";
import { Button as ButtonAnt } from "antd";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  CheckBoxIsImportant,
  CheckBoxIsSubTitle,
} from "@/components/checkbox-policy";
import { AlertModal } from "@/app/backend/modal/alert-modal";
import "react-quill/dist/quill.snow.css";
import { RoundSpinner } from "@/components/ui/spinner";
//Query
import { useCreatePolicy } from "@/app/query/policies/useCreatePolicy";
import { useDeletePolicy } from "@/app/query/policies/useDeletePolicy";
import { useUpdatePolicy } from "@/app/query/policies/useUpdatePolicy";
//Types
import { TypeFormPostPolicy } from "@/app/types/type";
import { quillFormats, quillModules } from "@/app/backend/Common/react-quiff";

interface UpdateFormProps {
  initialData: any | null;
}
// Lazy loading Editor khi nhập News Form để tránh lỗi
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export const UpdateForm: React.FC<UpdateFormProps> = ({ initialData }) => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormPostPolicy = {
    id: "",
    title: "",
    content: "",
    isImportant: false,
    isSubTitle: false,
    subtitle: "",
  };
  const [formData, setFormData] =
    useState<TypeFormPostPolicy>(initialPostFormData);
  const { mutationCreate, isLoading } = useCreatePolicy();
  const { mutationDelete, isLoadingDelete } = useDeletePolicy();
  const { mutationUpdate, isLoadingUpdate } = useUpdatePolicy();

  const title = `${initialData ? "Edit" : "Create"} policy`;
  const description = `${initialData ? "Edit" : "Add a new"} policy.`;
  const action = `${initialData ? "Save changes" : "Create"}`;

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: params?.id.toString(),
        subtitle: initialData.isSubtitle === false ? "" : initialData.subtitle,
        title: initialData.title || "",
        content: initialData.content || "",
        isImportant: initialData.isImportant || false,
        isSubTitle: initialData.isSubTitle || false,
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
    let postData: TypeFormPostPolicy = {
      id: formData.id,
      title: formData.title,
      content: formData.content,
      isSubTitle: formData.isSubTitle,
      isImportant: formData.isImportant,
      subtitle: formData.subtitle !== "" ? formData.subtitle : "No value",
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
  const handleToggleSubTitle = () => {
    setFormData((prevState) => ({
      ...prevState,
      isSubTitle: !prevState.isSubTitle,
      subtitle: prevState.isSubTitle ? "" : prevState.subtitle,
    }));
    setError((prevError) => {
      // Nếu isSubtitle là false, xóa lỗi subtitle
      if (formData.isSubTitle) {
        const { subtitle, ...restErrors } = prevError;
        return restErrors;
      }
      return prevError;
    });
  };

  const handleToggleImportant = () => {
    setFormData((prevState) => ({
      ...prevState,
      isImportant: !prevState.isImportant,
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
    <main>
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
        <form onSubmit={handleSubmit} className="mt-2 w-full space-y-8">
          <div className="gap-y-4 md:grid md:grid-cols-8">
            <div className="grid md:grid-cols-1">
              <CheckBoxIsSubTitle
                isChecked={formData.isSubTitle ?? false}
                onToggle={handleToggleSubTitle}
              />
            </div>
            <div className="grid md:grid-cols-1">
              <CheckBoxIsImportant
                isChecked={formData.isImportant ?? false}
                onToggle={handleToggleImportant}
              />
            </div>
          </div>
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
            {error && error.subtitle && (
              <div className="grid w-full">
                <div className="text-red-500">{error.subtitle}</div>
              </div>
            )}
            {formData.isSubTitle && (
              <div className="grid md:grid-cols-8">
                <label htmlFor="subtitle" className="col-span-1 pr-2">
                  Sub Title:
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
                    py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                    focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                  placeholder="SubTitle policy"
                />
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
              <ButtonAnt
                className="ml-0 flex items-center justify-center rounded-md bg-black px-4 py-2 text-white"
                type="primary"
                htmlType="submit"
                loading={isLoadingUpdate}
              >
                {action}
              </ButtonAnt>
            </div>
          </div>
        </form>
      </>
    </main>
  );
};

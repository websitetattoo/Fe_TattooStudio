"use client";
//Library
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic"; // (if using Next.js or use own dynamic loader)

//.......
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { RoundSpinner } from "@/components/ui/spinner";
import { ToastAction } from "@radix-ui/react-toast";
import { AlertModal } from "../../../modal/alert-modal";
import CustomFileInput from "../../../../../components/custom-choose-file";
import { News } from "@/app/types/type";
//import http from "@/lib/http";
//css
import "react-quill/dist/quill.snow.css";
import { post, put } from "@/lib/http";
import { quillFormats, quillModules } from "@/app/backend/UI/react-quiff";
// Lazy loading Editor when go to News Form to avoid error
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface NewsFormProps {
  initialData: News | null;
}

interface FormData {
  files: File | null;
  title: string;
  content: string;
  createdDate: Date;
}

export const NewsForm: React.FC<NewsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(true);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit news" : "Create news";
  const description = initialData ? "Edit a news." : "Add news";
  const action = initialData ? "Save changes" : "Create";

  const [formData, setFormData] = useState<FormData>({
    files: null,
    title: "",
    content: "", // Initial editor state
    createdDate: new Date(),
  });

  const extractHTMLContent = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    return html;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Data validation
    const errors = validateInput(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    try {
      setLoading(true);

      const editorState = formData.content;
      const formattedContent = extractHTMLContent(editorState);

      const postData = new FormData(); // Tạo một đối tượng FormData

      // Thêm dữ liệu vào FormData
      if (formData.files !== null) {
        postData.append("files", formData.files);
      }
      postData.append("title", formData.title);
      postData.append("content", formattedContent);
      postData.append("createDate", formData.createdDate.toISOString());

      if (initialData) {
        await put(`/news/${params.id}`, postData);
        setError({});
      } else {
        await post(`/news/create`, postData);
        router.refresh();
        setFormData({
          files: null,
          title: "",
          content: "",
          createdDate: new Date(),
        });
        setError({});
        setImageUrl(null);
      }
      toast({
        title: "News saved successfully",
        description: initialData
          ? "News updated successfully"
          : "News created successfully",
        action: (
          <div className="rounded bg-tattoo-color-bg p-2 text-white">
            <ToastAction altText="done">Done</ToastAction>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was a problem with your request",
        action: (
          <div className="rounded bg-tattoo-color-bg p-2 text-white">
            <ToastAction altText="Try again">Try again</ToastAction>
          </div>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle editor state change
  const onEditorStateChange = (newEditorState: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: newEditorState,
    }));
  };

  // Function to handle form field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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

  const validateInput = (value: any): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (!value.files) {
      errors.files = "Image must be provided.";
    }
    if (value.title.trim() === "") {
      errors.title = "Title can't be empty.";
    }
    const contentInsideQuiff = value.content.match(/<p>(.*?)<\/p>/)[1];
    // Kiểm tra nếu người dùng chỉ nhập khoảng trắng vào editor thì báo lỗi
    const constaint = /^\s*$/.test(contentInsideQuiff);
    if (value.content === "<p><br></p>" || constaint) {
      errors.content = "Content can't be empty.";
    }
    return errors;
  };
  useEffect(() => {
    if (initialData) {
      const getFile = async () => {
        const file = await downloadFileFromClouDinary(initialData.image);
        setFormData({
          files: file,
          title: initialData.title || "",
          content: initialData.content || "",
          createdDate: new Date(initialData.createdDate),
        });
        setImageUrl(initialData.image);
      };

      getFile();
    } else {
      setFormData({
        files: null,
        title: "",
        content: "",
        createdDate: new Date(),
      });
    }
  }, [initialData]);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center align-middle">
        <RoundSpinner className="h-16 w-full align-middle " size="xl" />
      </div>
    );
  }

  return (
    <main>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
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
              disabled={loading}
              placeholder="Title policy"
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
    </main>
  );
};

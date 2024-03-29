"use client";
//Library
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { Editor } from "react-draft-wysiwyg";
import { Trash } from "lucide-react";
//.......
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "../modal/alert-modal";
import { RoundSpinner } from "@/components/ui/spinner";
import { ToastAction } from "@radix-ui/react-toast";
import http from "@/lib/http";
//css
import "@tonz/react-draft-wysiwyg-input/style.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CheckBoxIsImportant, CheckBoxIsSubTitle } from "../checkbox-policy";

interface PolicyFormProps {
  initialData: any | null;
}

interface FormData {
  title: string;
  subtitle: string;
  content: EditorState;
  isSubTitle: boolean;
  isImportant: boolean;
}

export const PolicyForm: React.FC<PolicyFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit policy" : "Create policy";
  const description = initialData ? "Edit a policy." : "Add a new policy";
  const action = initialData ? "Save changes" : "Create";

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: EditorState.createEmpty(), // Initial editor state
    subtitle: "",
    isSubTitle: false,
    isImportant: false,
  });

  const extractHTMLContent = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    return html;
  };

  const handleSubmit = async (event: any) => {
    console.log("aaa:", formData);
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
      // Định nghĩa data post lên api gồm title,content, subtitle(nếu có)
      let postData: {
        title: string;
        content: string;
        subtitle: string;
        isSubTitle: boolean;
        isImportant: boolean;
      } = {
        title: formData.title,
        content: formattedContent,
        isSubTitle: formData.isSubTitle,
        isImportant: formData.isImportant,
        subtitle: formData.subtitle !== "" ? formData.subtitle : "No value",
      };

      if (initialData) {
        await http.put(`/policies/${params.id}`, postData);
        setError({});
      } else {
        await http.post(`/policies/create`, postData);
        router.refresh();
        setFormData({
          title: "",
          content: EditorState.createEmpty(),
          isImportant: false,
          isSubTitle: false,
          subtitle: "",
        });
        setError({});
      }
      toast({
        title: "Policy saved successfully",
        description: initialData
          ? "Policy updated successfully"
          : "Policy created successfully",
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
  const onEditorStateChange = (newEditorState: EditorState) => {
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
      setLoading(true);
      await http.delete(`/policies/${params._Id}`, {
        message: "Delete successfully",
      });
      router.refresh();
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const validateInput = (value: any): { [key: string]: string } => {
    console.log("formData", formData);
    const errors: { [key: string]: string } = {};
    if (value.title.trim() === "") {
      errors.title = "Title can't be empty.";
    }
    if (value.isSubTitle && value.subtitle.trim() === "") {
      errors.subtitle = "Subtitle can't be empty.";
    } else {
      delete errors.subtitle; // Xóa thông báo lỗi cho trường subtitle nếu isSubTitle là false
    }
    if (
      value.content &&
      value.content.getCurrentContent().getPlainText().trim() === ""
    ) {
      errors.content = "Content can't be empty.";
    }
    return errors;
  };
  useEffect(() => {
    if (initialData) {
      setFormData({
        subtitle: initialData.isSubtitle === false ? "" : initialData.subtitle,
        title: initialData.title || "",
        content: EditorState.createWithContent(
          stateFromHTML(initialData.content),
        ),
        isImportant: initialData.isImportant || false,
        isSubTitle: initialData.isSubTitle || false,
      });
    } else {
      setFormData({
        title: "",
        content: EditorState.createEmpty(),
        isImportant: false,
        isSubTitle: false,
        subtitle: "",
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
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
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
                disabled={loading}
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
            <label htmlFor="content" className="">
              Content:
            </label>
            <Editor
              editorState={formData.content}
              wrapperClassName="border border-gray-300"
              toolbarClassName="border-b border-gray-300"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
        </div>

        <Button
          className="ml-auto rounded-md bg-black px-4 py-2 text-white"
          type="submit"
        >
          {action}
        </Button>
      </form>
    </>
  );
};

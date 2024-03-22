"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { Editor } from "react-draft-wysiwyg";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "../modal/alert-modal";
import { RoundSpinner } from "@/components/ui/spinner";
import { ToastAction } from "@radix-ui/react-toast";
import http from "@/lib/http";

import "@tonz/react-draft-wysiwyg-input/style.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface PolicyFormProps {
  initialData: any | null;
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

  const [formData, setFormData] = useState({
    headerTitle: "",
    title: "",
    content: EditorState.createEmpty(), // Initial editor state
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
      const postData = {
        headerTitle: formData.headerTitle,
        title: formData.title,
        content: formattedContent,
      };

      if (initialData) {
        await http.put(`/policies/${params.id}`, postData);
        setError({});
      } else {
        await http.post(`/policies/create`, postData);
        router.refresh();
        setFormData({
          headerTitle: "",
          title: "",
          content: EditorState.createEmpty(),
        });
        setError({});
      }
      toast({
        title: "Policy saved successfully",
        description: initialData
          ? "Policy updated successfully"
          : "Policy created successfully",
        action: <ToastAction altText="done">Done</ToastAction>,
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "There was a problem with your request",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
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
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
    const errors: { [key: string]: string } = {};
    if (value.headerTitle.length < 3) {
      errors.headerTitle =
        "Please enter at least 3 characters for Header Title.";
    }
    if (value.title.length < 3) {
      errors.title = "Please enter at least 3 characters for Title.";
    }
    if (value.content.getCurrentContent().getPlainText().trim() === "") {
      errors.content = "Content can't be empty.";
    }

    return errors;
  };
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ initialData:", initialData);
    if (initialData) {
      setFormData({
        headerTitle: initialData.headerTitle || "",
        title: initialData.title || "",
        content: EditorState.createWithContent(
          stateFromHTML(initialData.content),
        ),
      });
    } else {
      setFormData({
        headerTitle: "",
        title: "",
        content: EditorState.createEmpty(),
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
        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.headerTitle && (
            <div className="grid w-full">
              <div className="text-red-500">{error.headerTitle}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="headerTitle" className="col-span-1 pr-2">
              Header Title:
            </label>
            <input
              type="text"
              id="headerTitle"
              name="headerTitle"
              value={formData.headerTitle}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              placeholder="Header title policy"
            />
            <div className="FormMessage"></div>
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
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              placeholder="Title policy"
            />
          </div>
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

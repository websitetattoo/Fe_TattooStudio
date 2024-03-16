"use client";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useParams, useRouter } from "next/navigation";
import "@tonz/react-draft-wysiwyg-input/style.css";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "../ui/use-toast";
import { stateToHTML } from "draft-js-export-html";
import { AlertModal } from "../modal/alert-modal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  headerTitle: z
    .string()
    .min(3, { message: "Policy Title must be at least 3 characters" }),
  title: z
    .string()
    .min(3, { message: "Policy content must be at least 3 characters" }),
  content: z
    .string()
    .min(3, { message: "Policy content must be at least 3 characters" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit policy" : "Create policy";
  const description = initialData ? "Edit a policy." : "Add a new policy";
  const action = initialData ? "Save changes" : "Create";
  // const defaultValues = initialData
  //   ? initialData
  //   : {
  //       headerTitle: "",
  //       title: "",
  //       content: "",
  //     };
  const [formData, setFormData] = useState({
    headerTitle: "",
    title: "",
    content: EditorState.createEmpty(), // Initial editor state
  });
  // const form = useForm<ProductFormValues>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues,
  // });
  // Function to extract text with styles from EditorState
  // const extractTextWithStyles = (editorState: any) => {
  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState);

  //   let textWithStyles: any = [];

  //   rawContentState.blocks.forEach((block) => {
  //     let text = block.text;
  //     let styles: any = [];

  //     block.inlineStyleRanges.forEach((range) => {
  //       const style = range.style;
  //       styles.push(style);
  //     });

  //     textWithStyles.push({ text, styles });
  //   });

  //   return textWithStyles;
  // };

  const extractHTMLContent = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    return html;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);

      const editorState = formData.content;
      const formattedContent = extractHTMLContent(editorState);
      console.log("🚀 ~ handleSubmit ~ formattedContent:", formattedContent);
      const postData = {
        headerTitle: formData.headerTitle,
        title: formData.title,
        content: formattedContent,
      };

      if (initialData) {
        await axios.put(
          `http://localhost:3001/policies/${params.policiesId}`,
          postData,
        );
      } else {
        await axios.post(
          `http://localhost:3001/policies/createPolicies`,
          postData,
        );
      }

      router.refresh();
      setFormData({
        headerTitle: "",
        title: "",
        content: EditorState.createEmpty(),
      });

      toast({
        variant: "default",
        title: "Policy saved successfully!",
        description: initialData
          ? "Policy updated successfully."
          : "Policy created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
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
      await axios.delete(`localhost:3001/policies/${params._id}`);
      router.refresh();
      // router.push(`/${params.storeId}/products`);
    } catch (error: any) {
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
        <div className="gap-8 md:grid md:grid-cols-3">
          <div className="FormItem">
            <label htmlFor="headerTitle" className="FormLabel">
              Header Title
            </label>
            <input
              type="text"
              id="headerTitle"
              name="headerTitle"
              value={formData.headerTitle}
              onChange={handleInputChange}
              className="FormControl"
              disabled={loading}
              placeholder="Header title policy"
            />
            <div className="FormMessage"></div>
          </div>
          <div className="FormItem">
            <label htmlFor="title" className="FormLabel">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="FormControl"
              disabled={loading}
              placeholder="Title policy"
            />
            <div className="FormMessage"></div>
          </div>
        </div>
        <div className="FormItem">
          <label htmlFor="content" className="FormLabel">
            Content
          </label>
          <Editor
            editorState={formData.content}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
          <div className="FormMessage"></div>
        </div>
        <button className="ml-auto" type="submit">
          {action}
        </button>
      </form>
    </>
  );
};

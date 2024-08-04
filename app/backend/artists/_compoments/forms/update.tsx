"use client";
//Library
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Trash } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Button as ButtonAnt } from "antd";

//Library UI
import { Form } from "antd";
import type { FormProps } from "antd";
import { AlertModal } from "@/app/backend/modal/alert-modal";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
//Query
import { useCreateArtist } from "@/app/query/artist/useCreateArtist";
import { useDeleteArtist } from "@/app/query/artist/useDeleteArtist";
import { useUpdateArtist } from "@/app/query/artist/useUpdateArtist";
//Types
import { TypeFormPostArtist } from "@/app/types/type";
import "react-quill/dist/quill.snow.css";
import { quillFormats, quillModules } from "@/app/backend/Common/react-quiff";
//Lib
import { uploadImage } from "@/lib/utils";

interface UpdateFormProps {
  initialData: any | null;
}

type FieldType = {
  avatar?: string;
  images?: string;
  name?: string;
  header?: string;
  link?: string;
  description?: string;
  file?: string;
  remember?: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// Lazy loading Editor khi nhập News Form để tránh lỗi
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export const UpdateFormArtist: React.FC<UpdateFormProps> = ({
  initialData,
}) => {
  const [formInfo] = Form.useForm();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorAvatar, setErrorAvatar] = useState("");
  const [errorImages, setErrorImages] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [images, setImages] = useState<UploadFile[]>([]);
  const [removeImage, setRemoveImage] = useState<UploadFile[]>([]);

  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormPostArtist = {
    id: "",
    name: "",
    header: "",
    description: "",
    avatar: [],
    images: [],
    link: "",
  };
  const [formData, setFormData] =
    useState<TypeFormPostArtist>(initialPostFormData);
  const { mutationCreate, isLoading: isLoadingCreate } = useCreateArtist();
  const { mutationDelete, isLoadingDelete } = useDeleteArtist();
  const { mutationUpdate, isLoadingUpdate } = useUpdateArtist();

  const title = `${initialData ? "Edit" : "Create"} Artist`;
  const description = `${initialData ? "Edit" : "Add a new"} Artist.`;
  const action = `${initialData ? "Save changes" : "Create"}`;
  const actionLoading = initialData ? isLoadingUpdate : isLoadingCreate;

  useEffect(() => {
    if (initialData) {
      let initialImages: UploadFile[] = [];
      let initialAvatar: UploadFile[] = [
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: initialData.avatar || "",
        },
      ];
      setFileList(initialAvatar);

      if (initialData.images.length > 0) {
        for (let i = 0; i < initialData.images.length; i++) {
          initialImages.push({
            uid: initialData.images[i]._id,
            name: "image.png",
            status: "done",
            url: initialData.images[i].url || "",
          });
        }
      }
      setImages(initialImages);

      setFormData({
        id: params?.id.toString(),
        name: initialData.name || "",
        header: initialData.header || "",
        description: initialData.description || "",
        avatar: initialData.avatar || "",
        link: initialData.link || "",
        images: initialData.images || [],
      });

      formInfo.setFieldsValue({
        name: initialData.name || "",
        header: initialData.header || "",
        link: initialData.link || "",
      });
    } else {
      setFormData(initialPostFormData);
    }
  }, [initialData]);

  // Định nghĩa các hàm xử lý -- Begin add

  const onChangeAvatar: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    setErrorAvatar("");
  };

  const onChangeImages: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setImages(newFileList);
    setErrorImages("");
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = (file: UploadFile) => {
    setRemoveImage((prevImages) => [...prevImages, file]);
  };

  // Hàm xử lý thay đổi trường biểu mẫu
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Hàm xử lý change input editor
  const onEditorStateChange = (newEditorState: string) => {
    setError("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: newEditorState,
    }));
  };

  // Hàm xử lý submit form
  const handleSubmit: FormProps<FieldType>["onFinish"] = async (
    values: any,
  ) => {
    if (initialData) {
      // Định nghĩa data post lên
      const artistData: TypeFormPostArtist = {
        id: formData.id,
        name: formData.name,
        header: formData.header,
        description: formData.description,
        avatar: fileList,
        images: images,
        link: formData.link,
      };

      if (removeImage.length > 0) {
        let newImagesList: any[] = [];
        let tmpRemote = 0;
        //Lặp qua và đẩy avatar lên cloud trước khi update
        for (const file of images) {
          if (file.url) {
            newImagesList.push(file.url);
          } else {
            const dataFile = {
              id: removeImage[tmpRemote].uid,
              parentId: formData.id,
              status: 0,
            };
            const fileListCloud = await uploadImage(dataFile, file);
            newImagesList.push(fileListCloud);
            tmpRemote++;
          }
        }
        //Gán lại giá trị các ảnh kèm theo khi update
        if (newImagesList.length > 0) {
          artistData.images = newImagesList;
        }
      } else {
        let newImagesList: any[] = [];
        for (const file of images) {
          if (file.url) {
            newImagesList.push(file.url);
          } else {
            const dataFile = {
              id: file.uid,
              parentId: formData.id,
              status: 1,
            };
            const fileListCloud = await uploadImage(dataFile, file);
            newImagesList.push(fileListCloud);
          }
        }
        if (newImagesList.length > 0) {
          artistData.images = newImagesList;
        }
      }

      //console.log("artistData:", artistData);
      //Xử lý update
      mutationUpdate.mutate(artistData);
    } else {
      if (formData.description.trim() === "") {
        setTimeout(() => {
          setError("Please input your description!");
        }, 200);
      } else {
        setError("");
      }

      if (fileList.length === 0) {
        setTimeout(() => {
          setErrorAvatar("Please upload your avatar!");
        }, 200);
      } else {
        setErrorAvatar("");
      }

      if (images.length === 0) {
        setTimeout(() => {
          setErrorImages("Please upload your images!");
        }, 200);
      } else {
        setErrorImages("");
      }

      if (
        formData.description.trim() !== "" &&
        fileList.length !== 0 &&
        images.length !== 0
      ) {
        // Định nghĩa data post lên
        const artistData: TypeFormPostArtist = {
          name: formData.name,
          header: formData.header,
          description: formData.description,
          avatar: fileList,
          images: images,
          link: formData.link,
        };

        //Xử lý Insert thông tin Artist
        mutationCreate.mutate(artistData, {
          onSuccess: () => {
            setFormData(initialPostFormData);
            setFileList([]);
            setImages([]);
          },
          onError: (error) => {
            console.error(error);
          },
        });
      }
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

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    if (formData.description.trim() === "") {
      setTimeout(() => {
        setError("Please input your description!");
      }, 200);
    } else {
      setError("");
    }

    if (fileList.length === 0) {
      setTimeout(() => {
        setErrorAvatar("Please upload your avatar!");
      }, 200);
    } else {
      setErrorAvatar("");
    }

    if (images.length === 0) {
      setTimeout(() => {
        setErrorImages("Please upload your images!");
      }, 200);
    } else {
      setErrorImages("");
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
      <Form
        className="fromContact-Style flex w-full flex-wrap"
        name="basic"
        form={formInfo}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          className="w-full"
          rules={[{ required: true, message: "Please input your avatar!" }]}
        >
          <label className="mb-3 ml-2 text-base font-medium capitalize">
            your avatar:
          </label>
          <div className="ml-2 mt-1">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChangeAvatar}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </div>
        </Form.Item>
        {errorAvatar && (
          <div className="grid w-full pl-2">
            <div className="text-red-500">{errorAvatar}</div>
          </div>
        )}

        <Form.Item<FieldType>
          className="w-full py-4"
          rules={[{ required: true, message: "Please input your images!" }]}
        >
          <label className="mb-3 ml-2 text-base font-medium capitalize">
            your images:
          </label>
          <div className="ml-2 mt-1">
            <Upload
              listType="picture-card"
              fileList={images}
              onChange={onChangeImages}
              onPreview={onPreview}
              onRemove={onRemove}
            >
              {images.length < 20 && "+ Upload"}
            </Upload>
          </div>
        </Form.Item>
        {errorImages && (
          <div className="grid w-full pl-2">
            <div className="text-red-500">{errorImages}</div>
          </div>
        )}

        <Form.Item<FieldType>
          className="w-full lg:w-1/2"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <div className="w-full px-3 lg:w-full">
            <label className="text-base font-medium capitalize ">
              your name:
            </label>
            <input
              id="name"
              name="name"
              className="focus-visible:ring-ring border-input placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full cursor-pointer rounded-md border
              bg-transparent p-2  px-3 py-1 text-sm text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
              focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Ex: Jessica Lauren"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </Form.Item>

        <Form.Item<FieldType>
          className="w-full lg:w-1/2"
          name="header"
          rules={[{ required: true, message: "Please input your header!" }]}
        >
          <div className="w-full px-3 lg:w-full">
            <label className="text-base font-medium capitalize ">
              your header:
            </label>
            <input
              id="header"
              name="header"
              className="focus-visible:ring-ring border-input placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full cursor-pointer rounded-md border
              bg-transparent p-2  px-3 py-1 text-sm text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
              focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Ex: Tattoo Artist"
              value={formData.header}
              onChange={handleInputChange}
            />
          </div>
        </Form.Item>

        <Form.Item<FieldType>
          className="w-full py-3 lg:w-1/2"
          name="link"
          rules={[{ required: true, message: "Please input your link!" }]}
        >
          <div className="w-full px-3 lg:w-full">
            <label className="text-base font-medium capitalize ">
              your link:
            </label>
            <input
              id="link"
              name="link"
              className="focus-visible:ring-ring border-input placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full cursor-pointer rounded-md border
              bg-transparent p-2  px-3 py-1 text-sm text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
              focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Ex: jslauren_tattoo"
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>
        </Form.Item>

        <Form.Item<FieldType> className="mb-0 w-full" name="description">
          <div className="w-full px-3 lg:w-full">
            <div className="mb-4">
              <label className="text-base font-medium capitalize ">
                your description:
              </label>
            </div>
            <QuillEditor
              id="description"
              value={formData.description}
              onChange={onEditorStateChange}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>
        </Form.Item>
        {error && (
          <div className="grid w-full pl-2">
            <div className="text-red-500">{error}</div>
          </div>
        )}

        <Form.Item className="flex w-full justify-start pb-20 pt-4 text-center">
          <ButtonAnt
            className="ml-4 flex items-center justify-center rounded-md bg-black px-2 py-2 text-white"
            type="primary"
            htmlType="submit"
            loading={actionLoading}
          >
            {action}
          </ButtonAnt>
        </Form.Item>
      </Form>
    </>
  );
};

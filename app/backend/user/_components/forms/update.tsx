"use client";
//Library
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
//Library UI
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
//Types
import { TypeFormUpdateUser, User } from "@/app/types/type";
import { useUpdateUser } from "@/app/query/user/useUpdateUser";
import { Button } from "@/components/ui/button";

interface UpdateFormProps {
  initialData: User[] | null;
}

export const UpdateUser: React.FC<UpdateFormProps> = ({ initialData }) => {
  const params = useParams();
  const [error, setError] = useState<{ [key: string]: string }>({});
  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormUpdateUser = {
    id: "",
    tel: "",
    email: "",
    instagram: "",
    facebook: "",
    password: "",
  };
  const [formData, setFormData] =
    useState<TypeFormUpdateUser>(initialPostFormData);
  const { mutationUpdate, isLoadingUpdate } = useUpdateUser();

  const title = `Edit User`;
  const description = `Update information of User.`;
  const action = `Save changes`;

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: params?.id.toString(),
        tel: initialData[0].tel || "",
        email: initialData[0].email || "",
        instagram: initialData[0].instagram || "",
        facebook: initialData[0].facebook || "",
        password: initialData[0].password || "",
      });
    } else {
      setFormData(initialPostFormData);
    }
  }, [initialData]);

  // Xử lý validate cho các thẻ input
  const validateInput = (value: any): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    if (value.tel.trim() === "") {
      errors.tel = "Your number phone can't be empty.";
    }

    if (value.email.trim() === "") {
      errors.email = "Email can't be empty.";
    }
    if (value.password.trim() === "") {
      errors.password = "Password can't be empty.";
    }
    if (value.instagram.trim() === "") {
      errors.instagram = "Your Instagram account can't be empty.";
    }

    if (value.facebook.trim() === "") {
      errors.facebook = "Your Facebook account can't be empty.";
    }

    return errors;
  };

  // Định nghĩa các hàm xử lý -- Begin add

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
    let postData: TypeFormUpdateUser = {
      id: formData.id.toString(),
      tel: formData.tel,
      email: formData.email,
      instagram: formData.instagram,
      facebook: formData.facebook,
      password: formData.password,
    };

    if (initialData) {
      mutationUpdate.mutate(postData);
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
  // Định nghĩa các hàm xử lý -- End add

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.tel && (
            <div className="grid w-full">
              <div className="text-red-500">{error.tel}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="tel" className="col-span-1 pr-2">
              Tel:
            </label>
            <input
              type="text"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoadingUpdate}
              placeholder="Your number phone"
            />
            <div className="FormMessage"></div>
          </div>
        </div>

        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.email && (
            <div className="grid w-full">
              <div className="text-red-500">{error.email}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="email" className="col-span-1 pr-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoadingUpdate}
              placeholder="Email....."
            />
            <div className="FormMessage"></div>
          </div>
        </div>

        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.password && (
            <div className="grid w-full">
              <div className="text-red-500">{error.password}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="password" className="col-span-1 pr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoadingUpdate}
              placeholder="password....."
            />
            <div className="FormMessage"></div>
          </div>
        </div>

        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.instagram && (
            <div className="grid w-full">
              <div className="text-red-500">{error.instagram}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="instagram" className="col-span-1 pr-2">
              Instagram:
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoadingUpdate}
              placeholder="Your Instagram account"
            />
            <div className="FormMessage"></div>
          </div>
        </div>

        <div className="gap-y-4 md:grid md:grid-cols-1">
          {error && error.facebook && (
            <div className="grid w-full">
              <div className="text-red-500">{error.facebook}</div>
            </div>
          )}
          <div className="grid md:grid-cols-8">
            <label htmlFor="facebook" className="col-span-1 pr-2">
              Facebook:
            </label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoadingUpdate}
              placeholder="Your Facebook account"
            />
            <div className="FormMessage"></div>
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

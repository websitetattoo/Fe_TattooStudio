"use client";
//Library
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
//Library UI
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
//Types
import { Artist, TypeFormViewArtist } from "@/app/types/type";

import { Image } from "antd";
import { stripHtmlTags } from "@/lib/utils";

interface ViewFormProps {
  initialData: Artist | null;
}

export const ViewArtist: React.FC<ViewFormProps> = ({ initialData }) => {
  const params = useParams();
  const title = `View Artist`;
  const description = `View information of Artist.`;

  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormViewArtist = {
    id: "",
    name: "",
    header: "",
    description: "",
    link: "",
    avatar: "",
    images: [],
  };
  const [formData, setFormData] =
    useState<TypeFormViewArtist>(initialPostFormData);

  useEffect(() => {
    if (initialData) {
      const stripHtmlDescription = stripHtmlTags(initialData.description || "");

      setFormData({
        id: params?.id.toString(),
        name: initialData.name || "",
        header: initialData.header || "",
        description: stripHtmlDescription,
        link: initialData.link || "",
        avatar: initialData.avatar || "",
        images: initialData.images,
      });
    }
  }, [initialData]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div className="gap-y-4 md:grid md:grid-cols-1">
        <div className="grid md:grid-cols-8">
          <label htmlFor="tel" className="col-span-1 pr-2 font-bold">
            Name:
          </label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={formData.name}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            readOnly
            onChange={() => {}}
          />
          <div className="FormMessage"></div>
        </div>
      </div>
      <div className="gap-y-4 md:grid md:grid-cols-1">
        <div className="grid md:grid-cols-8">
          <label htmlFor="header" className="col-span-1 pr-2 font-bold">
            Header:
          </label>
          <input
            type="text"
            id="header"
            name="header"
            value={formData.header}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            readOnly
            onChange={() => {}}
          />
          <div className="FormMessage"></div>
        </div>
      </div>

      <div className="gap-y-4 md:grid md:grid-cols-1">
        <div className="grid md:grid-cols-8">
          <label htmlFor="Link" className="col-span-1 pr-2 font-bold">
            Link:
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            readOnly
            onChange={() => {}}
          />
          <div className="FormMessage"></div>
        </div>

        <div className="mt-4 gap-y-4 md:grid md:grid-cols-1 lg:mt-0">
          <div className="grid md:grid-cols-8">
            <label htmlFor="Description" className="col-span-1 pr-2 font-bold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
                         py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
                         focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ height: "200px" }}
              readOnly
              onChange={() => {}}
            ></textarea>
            <div className="FormMessage"></div>
          </div>
        </div>

        <h3 className="font-bold">Avatar: </h3>
        <div className="ml-0 flex flex-wrap md:ml-20 lg:ml-40">
          <div className="wrap m-1 flex">
            <Image
              className="w-fulw h-full object-cover lg:w-1/4"
              width={300}
              height={300}
              src={formData.avatar}
            />
          </div>
        </div>

        <h3 className="font-bold">Images: </h3>
        <div className="ml-0 flex max-h-[calc(500px)] flex-wrap overflow-y-auto md:ml-20 lg:ml-40">
          {formData?.images?.map((item: any, index: number) => (
            <div key={index} className="wrap m-1 flex">
              <Image
                className="w-fulw h-full object-cover lg:w-1/4"
                width={300}
                height={300}
                src={item.url}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

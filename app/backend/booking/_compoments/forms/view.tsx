"use client";
//Library
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
//Library UI
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
//Types
import { Booking, TypeFormViewBooking } from "@/app/types/type";

import { Image } from "antd";

interface ViewFormProps {
  initialData: Booking | null;
}

export const ViewBooking: React.FC<ViewFormProps> = ({ initialData }) => {
  const params = useParams();
  const title = `View Booking`;
  const description = `View information of Booking.`;
  const [selectedImage, setSelectedImage] = useState(null);
  //Khởi tạo giá trị ban đầu
  const initialPostFormData: TypeFormViewBooking = {
    id: "",
    name: "",
    phone: "",
    address: "",
    email: "",
    schedule: "",
    artist: "",
  };
  const [formData, setFormData] =
    useState<TypeFormViewBooking>(initialPostFormData);

  useEffect(() => {
    if (initialData) {
      const dateValue = new Date(initialData.schedule);
      const schedule = dateValue.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      setFormData({
        id: params?.id.toString(),
        name: initialData.name || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        email: initialData.email || "",
        schedule: schedule || "",
        artist: initialData.artist?.name || "",
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
          <label htmlFor="tel" className="col-span-1 pr-2">
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
          <label htmlFor="tel" className="col-span-1 pr-2">
            Phone:
          </label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            value={formData.phone}
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
          <label htmlFor="email" className="col-span-1 pr-2">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
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
          <label htmlFor="Address" className="col-span-1 pr-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
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
          <label htmlFor="schedule" className="col-span-1 pr-2">
            Schedule:
          </label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={formData.schedule}
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
          <label htmlFor="schedule" className="col-span-1 pr-2">
            Artist:
          </label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={formData.artist}
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring col-span-7 rounded-md border bg-transparent px-3 
              py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none 
              focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            readOnly
            onChange={() => {}}
          />
          <div className="FormMessage"></div>
        </div>
      </div>
      <h3>Images: </h3>
      <div className="ml-0 flex flex-wrap md:ml-20 lg:ml-40">
        {formData?.images?.map((url: string, index: number) => (
          <div key={index} className="wrap m-1 flex">
            <Image
              className="w-fulw h-full object-cover lg:w-1/4"
              width={300}
              height={300}
              src={url}
            />
          </div>
        ))}
      </div>
    </>
  );
};

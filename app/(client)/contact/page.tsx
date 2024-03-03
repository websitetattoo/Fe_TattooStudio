"use client";

import PageTitle from "@/components/page-title";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Index() {
  const title =
    "Do you want to visit? With a little more information, we can help you with what tattoo you're looking for! Fill out the form below:";

  const handlePost = () => {
    const form = new FormData();
    console.log(form);
  };

  const arrInput = [
    {
      label: "your name:",
      content: "Ex: Christ Rock",
      type: "text",
      children: [],
      value: "",
    },
    {
      label: "your phone number:",
      content: "Ex: 407-799-7181",
      type: "tel",
      value: "",
      children: [],
    },
    {
      label: "Your Address:",
      content: "Ex: 2620 Simpson Rd, Kissimmee, FL 34744, United States",
      type: "text",
      children: [],
      value: "",
    },
    {
      label: "Email:",
      content: "Ex: test@gmail.com",
      type: "email",
      children: [],
      value: "",
    },
    {
      label: "Your Schedule:",
      content: "Ex: 02/08/2024",
      type: "date",
      children: [],
      value: "",
    },
    {
      label: "Which artist(s) were you looking to work with?",
      content: "Choose your favorite artist",
      type: "select",
      children: ["Light", "Dark", "System"],
    },
    {
      label: "Tattoo Description:",
      content:
        "Ex: Dragon, vibrant color, balance between power and grace for timeless piece",
      type: "text",
      children: [],
      value: "",
    },
    {
      label: "Additional reference image for your tattoo: (optional)",
      content: "Choose File",
      type: "file",
      children: [],
      value: "",
    },
  ];

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="m-auto w-11/12 md:w-9/12 lg:w-9/12">
      <div>
        <PageTitle>
          <div className="m-auto w-10/12">
            <h1 className="mb-8 text-center font-medium leading-6 text-white lg:text-2xl">
              {title}
            </h1>
          </div>
        </PageTitle>
      </div>
      <div className="mt-8 w-full flex-wrap  lg:mt-20 lg:flex">
        {arrInput.map((item, index) =>
          item.type === "select" ? (
            <div key={index} className="select-css w-full px-3 lg:w-1/2">
              <label className="font-medium capitalize text-white">
                {item.label}
              </label>
              <div className="select-css my-1">
                <Select>
                  <SelectTrigger className=" text-white">
                    <SelectValue placeholder="Choose your favorite artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(item.children) &&
                      item.children.length > 0 &&
                      item.children.map((childItem, index) => (
                        <SelectItem
                          key={index}
                          className="text-white"
                          value={childItem}
                        >
                          {childItem}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div
              className="InputFile-css w-full px-3 pb-4 lg:w-1/2"
              key={index}
            >
              <label className="font-medium capitalize text-white">
                {item.label}
              </label>
              <input
                className="mt-1 w-full border border-tattoo-gray bg-tattoo-black-2 p-2 text-sm text-white"
                type={item.type}
                multiple
                placeholder={item.content}
                // value={item.value}
                accept="image/*"
              />
            </div>
          ),
        )}
      </div>
      <div className="pb-20 pt-4 text-center">
        <button
          className="text:lg font-meidum bg-tattoo-highlight p-2 uppercase text-white"
          type="submit"
        >
          submit
        </button>
      </div>
    </div>
  );
}

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

  const arrInput = [
    {
      label: "your name:",
      content: "Ex: Christ Rock",
      type: "text",
      children: [],
    },
    {
      label: "your phone number:",
      content: "Ex: 407-799-7181",
      type: "text",
      children: [],
    },
    {
      label: "Your Address:",
      content: "Ex: 2620 Simpson Rd, Kissimmee, FL 34744, United States",
      type: "text",
      children: [],
    },
    {
      label: "Email:",
      content: "Ex: test@gmail.com",
      type: "email",
      children: [],
    },
    {
      label: "Your Schedule:",
      content: "Ex: 02/08/2024",
      type: "date",
      children: [],
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
    },
    {
      label: "Additional reference image for your tattoo: (optional)",
      content: "Choose File",
      type: "file",
      children: [],
    },
  ];

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="m-auto lg:w-9/12 md:w-9/12 w-11/12">
      <div>
        <PageTitle>
          <div className="m-auto w-10/12">
            <h1 className="mb-8 text-center font-medium text-white lg:text-2xl leading-6">
              {title}
            </h1>
          </div>
        </PageTitle>
      </div>
      <div className="lg:mt-20 mt-8 lg:flex  w-full flex-wrap">
        {arrInput.map((item, index) =>
          item.type === "select" ? (
            <div key={index} className="select-css lg:w-1/2 w-full px-3">
              <label className="font-medium capitalize text-white">
                {item.label}
              </label>
              <div className="select-css my-1">
                <Select className="w-full outline-none outline-0">
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
            <div className="lg:w-1/2 w-full px-3 pb-4 InputFile-css" key={index}>
              <label className="font-medium capitalize text-white">
                {item.label}
              </label>
              <input
                className="mt-1 w-full border border-tattoo-gray bg-tattoo-black-2 p-2 text-sm text-white"
                type={item.type}
                multiple
                placeholder={item.content}
                accept="image/*"
              />
            </div>
          ),
        )}
      </div>
      <div className="text-center pb-20 pt-4">
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

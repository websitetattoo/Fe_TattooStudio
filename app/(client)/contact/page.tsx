"use client";

import PageTitle from "@/components/page-title";
import React from "react";
import { Select, DatePicker, Space } from "antd";
import type { DatePickerProps, GetProps } from "antd";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export default function Index() {
  const title =
    "Do you want to visit? With a little more information, we can help you with what tattoo you're looking for! Fill out the form below:";

  const handlePost = () => {
    const form = new FormData();
  };

  const arrInput = [
    {
      label: "your name:",
      content: "Ex: Christ Rock",
      type: "text",
      value: "",
      status: 1,
    },
    {
      label: "your phone number:",
      content: "Ex: 407-799-7181",
      type: "tel",
      value: "",
      status: 1,
    },
    {
      label: "Your Address:",
      content: "Ex: 2620 Simpson Rd, Kissimmee, FL 34744, United States",
      type: "text",
      value: "",
      status: 1,
    },
    {
      label: "Email:",
      content: "Ex: test@gmail.com",
      type: "email",
      value: "",
      status: 1,
    },
    {
      label: "Your Schedule:",
      content: "Ex: 02/08/2024",
      type: "date",
      value: "",
      status: 3,
    },
    {
      label: "Which artist(s) were you looking to work with?",
      content: "Choose your favorite artist",
      type: "select",
      status: 2,
    },
    {
      label: "Tattoo Description:",
      content:
        "Ex: Dragon, vibrant color, balance between power and grace for timeless piece",
      type: "text",
      value: "",
      status: 1,
    },
    {
      label: "Additional reference image for your tattoo: (optional)",
      content: "Choose File",
      type: "file",
      value: "",
      status: 1,
    },
  ];

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
  ) => {
    console.log("onOk: ", value);
  };

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
      <div className="mt-8 w-full flex-wrap lg:mt-20 lg:flex">
        {arrInput.map((item, index) => (
          <React.Fragment key={index}>
            {item.status === 2 && (
              <div className="select-css w-full px-3 lg:w-1/2">
                <label className="font-medium capitalize text-white">
                  {item.label}
                </label>
                <div className="select-css my-1">
                  <Select
                    className="w-full"
                    showSearch
                    placeholder={item.content}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      { value: "1", label: "Not Identified" },
                      { value: "2", label: "Closed" },
                      { value: "3", label: "Communicated" },
                      { value: "4", label: "Identified" },
                      { value: "5", label: "Resolved" },
                      { value: "6", label: "Cancelled" },
                    ]}
                  />
                </div>
              </div>
            )}

            {item.status === 3 && (
              <div className="dateTimePicker-css w-full px-3 lg:w-1/2">
                <label className="font-medium capitalize text-white">
                  {item.label}
                </label>
                <div className="dateTimePicker-css my-1">
                  <DatePicker
                    className="w-full"
                    placeholder={item.content}
                    showTime
                    onChange={(value, dateString) => {
                      // console.log("Selected Time: ", value);
                      // console.log("Formatted Selected Time: ", dateString);
                    }}
                    onOk={onOk}
                  />
                </div>
              </div>
            )}

            {item.status === 1 && (
              <div className="InputFile-css w-full px-3 pb-4 lg:w-1/2">
                <label className="font-medium capitalize text-white">
                  {item.label}
                </label>
                <input
                  className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                  type={item.type}
                  multiple
                  placeholder={item.content}
                  accept="image/*"
                />
              </div>
            )}
          </React.Fragment>
        ))}
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

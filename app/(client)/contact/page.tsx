"use client";
//Libaries
import React, { ChangeEvent, useEffect, useState } from "react";
import { RoundSpinner } from "@/components/ui/spinner";
import { Select, DatePicker } from "antd";
import type { FormProps } from "antd";
import { Form } from "antd";
//Query
import { useGetDataArtist } from "@/app/query/artist/useGetAllArtist";
import { useCreateBooking } from "@/app/query/booking/useCreateBooking";
//Type
import { Artist, Data } from "@/app/types/type";
import PageTitle from "@/components/page-title";

type convertArtist = {
  value?: string;
  label?: string;
};

type FieldType = {
  Artist?: string;
  Schedule?: string;
  phone?: string;
  name: string;
  email: string;
  address?: string;
  description?: string;
  file?: string;
  remember?: string;
};

type FormData = {
  artist: string;
  schedule: string;
  address: string;
  description: string;
  email: string;
  name: string;
  phone: string;
  files: File[] | null;
};

export default function Index() {
  const [formInfo] = Form.useForm();
  const { mutationCreate, isLoading } = useCreateBooking();

  const [schedule, setSchedule] = useState("");
  const [artist, setArtist] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [artistName, setArtistName] = useState<convertArtist[]>([]);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const filterDataApi = {
    fields: "name",
  };
  const { data, isLoading: loading } = useGetDataArtist(filterDataApi);
  const title =
    "Do you want to visit? With a little more information, we can help you with what tattoo you're looking for! Fill out the form below:";

  useEffect(() => {
    const dataArtist = (data as Data)?.data as Artist[];
    const newDataArtist: convertArtist[] = dataArtist?.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setArtistName(newDataArtist);
  }, [data, loading]);

  useEffect(() => {
    formInfo.setFieldsValue({
      Artist: artist,
    });
  }, [artist]);

  useEffect(() => {
    formInfo.setFieldsValue({
      Schedule: schedule,
    });
  }, [schedule]);

  //Các hàm xử lý form - Begin add
  const handleChangeSelect = (_: any, item: any) => {
    setArtist(item.value);
  };

  const handleChangeFilesInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit: FormProps<FieldType>["onFinish"] = (values: any) => {
    let arrImages = [];
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        arrImages.push(file);
      }
    } else return "Post dữ liệu không thành công";

    const formData: FormData = {
      artist: values.Artist,
      schedule: values.Schedule,
      address: values.address,
      description: values.description,
      email: values.email,
      name: values.name,
      phone: values.phone,
      files: arrImages,
    };

    mutationCreate.mutate(formData);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };
  //Các hàm xử lý form - End add

  return (
    <div className="relative m-auto w-11/12 md:w-9/12 lg:w-9/12">
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
        <Form
          className="fromContact-Style flex w-full flex-wrap"
          name="basic"
          form={formInfo}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <div className="w-full px-3 lg:w-full">
              <label className="text-base font-medium uppercase capitalize text-white">
                your name:
              </label>
              <input
                className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                type="text"
                placeholder="Ex: Christ Rock"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <div className="w-full px-3 lg:w-full">
              <label className="text-base font-medium uppercase capitalize text-white">
                your phone number:
              </label>
              <input
                className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                type="text"
                placeholder="Ex: 407-799-7181"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="address"
            rules={[
              { required: true, message: "Please input your phone address!" },
            ]}
          >
            <div className="w-full px-3 lg:w-full">
              <label className="text-base font-medium uppercase capitalize text-white">
                Your Address:
              </label>
              <input
                className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                type="text"
                placeholder="Ex: 2620 Simpson Rd, Kissimmee, FL 34744, United States"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email" },
            ]}
          >
            <div className="w-full px-3 lg:w-full">
              <label className="text-base font-medium uppercase capitalize text-white">
                Your Email:
              </label>
              <input
                className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                type="email"
                placeholder="Ex: test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="Schedule"
            rules={[{ required: true, message: "Please input your Schedule!" }]}
            initialValue={schedule}
          >
            <div className="dateTimePicker-css w-full px-3 lg:w-full">
              <label className="text-base font-medium capitalize text-white">
                Your Schedule:
              </label>
              <div className="dateTimePicker-css my-1">
                <DatePicker
                  className="w-full"
                  placeholder="Ex: 2024-08-04"
                  showTime
                  onChange={(_, dateString) => {
                    if (dateString) {
                      setSchedule(dateString.toString());
                    }
                  }}
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="Artist"
            rules={[{ required: true, message: "Please input your Artist!" }]}
            initialValue={artist}
          >
            <div className="select-css w-full px-3 lg:w-full">
              <label className="text-base font-medium capitalize text-white">
                Which artist(s) were you looking to work with?
              </label>
              <div className="select-css my-1">
                <Select
                  className="w-full"
                  showSearch
                  placeholder="Choose your favorite artist"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={handleChangeSelect}
                  options={artistName}
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="description"
            rules={[
              { required: true, message: "Please input your Description!" },
            ]}
          >
            <div className="w-full px-3 lg:w-full">
              <label className="text-base font-medium uppercase capitalize text-white">
                Tattoo Description:
              </label>
              <input
                className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                placeholder="Ex: Dragon, vibrant color, balance between power and grace for timeless piece"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            className="w-full lg:w-1/2"
            name="file"
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <div className="InputFile-css w-full px-3 lg:w-full">
              <label className="text-base font-medium uppercase capitalize text-white">
                Additional reference image for your tattoo: (optional):
              </label>
              <input
                className="mt-1 w-full cursor-pointer border border-tattoo-gray bg-tattoo-color-bg p-2 text-sm text-white"
                type="file"
                multiple
                placeholder="Choose file"
                accept="image/*"
                onChange={handleChangeFilesInput}
              />
            </div>
          </Form.Item>

          <Form.Item className="w-full pb-20 pt-4 text-center">
            <button
              className="text:lg font-meidum rounded-sm bg-tattoo-highlight p-2 uppercase text-white transition duration-300 ease-in-out hover:opacity-80"
              type="submit"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
      {isLoading && (
        <div className="spinCSS_Style flex h-full items-center justify-center text-white">
          <RoundSpinner className="h-16 w-full" size="md" />
        </div>
      )}
    </div>
  );
}

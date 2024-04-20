"use client";
//Libaries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
//Query
//Type
import BreadCrumb from "@/components/breadcrumb";
import { UpdateUser } from "../_components/forms/update";
import { User } from "@/app/types/type";
import { useGetDataUserById } from "@/app/query/user/useGetUserById";
import { useGetDataUser } from "@/app/query/user/useGetUser";

export default function Page() {
  const params = useParams();
  const [initialData, setInitialData] = useState<User[] | null>(null);

  //useQuery
  const { data, isLoading } = useGetDataUser();
  console.log(data, isLoading);
  const breadcrumbItems = [
    { title: "User", link: "/backend/user" },
    { title: "Update", link: "#" },
  ];

  useEffect(() => {
    const dataUser = data as User[];
    setInitialData(dataUser);
  }, [data, isLoading]);

  if (initialData) {
    return (
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UpdateUser initialData={initialData} key={null} />
      </div>
    );
  }
}

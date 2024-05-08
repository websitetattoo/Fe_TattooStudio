"use client";
//Libary
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { useGetDataUser } from "@/app/query/user/useGetUser";
import { RoundSpinner } from "@/components/ui/spinner";
import { Data, User } from "@/app/types/type";
import { UsersTables } from "./_components/tables";
import { DialogCloseButton } from "@/components/changePassword";

export default function Index() {
  const breadcrumbItems = [{ title: "User", link: "/backend/user" }];
  const [user, setUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: loading } = useGetDataUser();
  useEffect(() => {
    const dataUser = data as Data as User[];
    setUser(dataUser);
    setIsLoading(loading);
  }, [data, isLoading]);

  return (
    <>
      {!loading && Array.isArray(user) ? (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <DialogCloseButton />
          <UsersTables data={user} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <RoundSpinner className="h-16 w-full" size="xl" />
        </div>
      )}
    </>
  );
}

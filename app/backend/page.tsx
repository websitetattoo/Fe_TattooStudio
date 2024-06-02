// import AdminCard from "@/components/admin-card";
// import { CircleDollarSign, UserCheck, Users, UsersIcon } from "lucide-react";

"use client";
//Libary
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { useGetDataUser } from "@/app/query/user/useGetUser";
import { RoundSpinner } from "@/components/ui/spinner";
import { Data, User } from "@/app/types/type";
import { DialogCloseButton } from "@/components/changePassword";
import { UsersTables } from "./user/_components/tables";

export default function Index() {
  // const objAdminCard = [
  //   {
  //     icon: <UserCheck />,
  //     percent: "18%",
  //     title: "Lịch xăm đã duyệt",
  //     titleNumber: 20,
  //     className: "text-blue-700",
  //     classNameBg: "bg-blue-300",
  //   },
  //   {
  //     icon: <Users />,
  //     percent: "35%",
  //     title: "Tổng số nhân viên",
  //     titleNumber: 50,
  //     className: "text-red-700",
  //     classNameBg: "bg-red-300",
  //   },
  //   {
  //     icon: <UsersIcon />,
  //     percent: "150%",
  //     title: "Tổng số khách hàng",
  //     titleNumber: 300,
  //     className: "text-yellow-700",
  //     classNameBg: "bg-yellow-300",
  //   },
  //   {
  //     icon: <CircleDollarSign />,
  //     percent: "100%",
  //     title: "Lợi nhuận doanh thu",
  //     titleNumber: 20000000,
  //     className: "text-blue-700",
  //     classNameBg: "bg-blue-300",
  //   },
  // ];
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
    // <div className="flex bg-teal-100 p-4">
    //   {objAdminCard.map((item, idx) => (
    //     <AdminCard obj={item} key={idx} className={item.className} />
    //   ))}
    // </div>
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

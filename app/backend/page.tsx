import AdminCard from "@/components/admin-card";
import { CircleDollarSign, UserCheck, Users, UsersIcon } from "lucide-react";

export default function Index() {
  const objAdminCard = [
    {
      icon: <UserCheck />,
      percent: "18%",
      title: "Lịch xăm đã duyệt",
      titleNumber: 20,
      className: "text-blue-700",
      classNameBg: "bg-blue-300",
    },
    {
      icon: <Users />,
      percent: "35%",
      title: "Tổng số nhân viên",
      titleNumber: 50,
      className: "text-red-700",
      classNameBg: "bg-red-300",
    },
    {
      icon: <UsersIcon />,
      percent: "150%",
      title: "Tổng số khách hàng",
      titleNumber: 300,
      className: "text-yellow-700",
      classNameBg: "bg-yellow-300",
    },
    {
      icon: <CircleDollarSign />,
      percent: "100%",
      title: "Lợi nhuận doanh thu",
      titleNumber: 20000000,
      className: "text-blue-700",
      classNameBg: "bg-blue-300",
    },
  ];
  return (
    <div className="flex bg-teal-100 p-4">
      {objAdminCard.map((item, idx) => (
        <AdminCard obj={item} key={idx} className={item.className} />
      ))}
    </div>
  );
}

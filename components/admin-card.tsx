import { ChevronUp, Users } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface AdminCardProps {
  obj: {
    icon: JSX.Element;
    percent: string;
    title: string;
    titleNumber: number;
    classNameBg?: string;
  };
  className?: string;
}

export default function AdminCard({ obj, className }: AdminCardProps) {
  return (
    <div className=" mr-4 w-3/12 bg-white py-4 transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className={twMerge("h-full w-full p-4", className)}>
          {obj.icon}
        </div>
        {/* Percent */}
        <div
          className={twMerge(
            "mr-5 flex h-full w-auto justify-between rounded-full text-white",
            obj.classNameBg,
          )}
        >
          <div className="w-full px-2">{obj.percent}</div>
          <div className="mr-2 font-thin">
            <ChevronUp width={20} />
          </div>
        </div>
      </div>
      {/* NumberTitle */}
      <div
        className={twMerge(
          "px-4 pt-2 text-2xl font-bold text-tattoo-black-1",
          className,
        )}
      >
        {obj.titleNumber}
      </div>
      {/* Title */}
      <div
        className={twMerge("px-4 text-lg font-medium text-gray-500", className)}
      >
        {obj.title}
      </div>
    </div>
  );
}

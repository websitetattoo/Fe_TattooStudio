import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function PageTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      <div className="bg-dots absolute inset-0 z-0"></div>
      <div
        className={twMerge(
          "relative z-10 flex items-center justify-center py-10",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

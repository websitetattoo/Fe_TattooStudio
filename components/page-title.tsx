import { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="bg-dots absolute inset-0 z-0"></div>
      <div className="relative z-10 flex items-center justify-center py-10">
        {children}
      </div>
    </div>
  );
}

import { ReactNode } from "react";

export default function ButtonNews({ children }: { children: ReactNode }) {
  return (
    <button className="bg-tattoo-highlight p-6 py-3 text-center text-sm uppercase text-white  hover:opacity-50 md:p-3">
      {children}
    </button>
  );
}

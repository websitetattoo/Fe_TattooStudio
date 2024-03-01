import { ReactNode } from "react";

export default function ButtonAppointment({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <button className="bg-tattoo-highlight p-3 text-center text-sm uppercase text-white md:text-xl lg:text-xl">
      {children}
    </button>
  );
}

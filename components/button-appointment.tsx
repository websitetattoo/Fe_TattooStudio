import { ReactNode } from "react";

export default function ButtonAppointment({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <button className="bg-tattoo-highlight p-3 text-center text-sm uppercase text-white duration-200 ease-in hover:opacity-50 md:text-xl lg:text-xl">
      {children}
    </button>
  );
}

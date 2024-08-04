import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function HighlightText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        "text-5xl font-bold uppercase text-tattoo-highlight",
        className,
      )}
    >
      {children}
    </span>
  );
}

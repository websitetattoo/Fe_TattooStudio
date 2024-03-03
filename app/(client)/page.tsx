"use client";

import { CalendarMinus2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Index() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative h-screen w-full">
      <Image
        alt="Home Image"
        width={1000}
        height={1000}
        src={
          isMobile
            ? "/home-tablet.jpg"
            : isTablet
              ? "/home-tablet.jpg"
              : "/home.jpg"
        }
        className="h-full w-full object-cover opacity-20"
      />
      <div className="absolute left-0 right-0 top-1/2 w-full text-center text-5xl  text-tattoo-gray">
        <div className="pb-2">FLORIDA KINGS TATTOO</div>
        <Link href={"/contact"}>
          <button className="justify-center border-[1px] border-white border-t-tattoo-gray text-white hover:border-0 hover:bg-tattoo-highlight">
            <div className="flex p-4 py-2">
              <CalendarMinus2 className="pr-1 text-white" />
              <div className="pl-1 text-base font-bold">BOOK NOW</div>
            </div>
          </button>
        </Link>
      </div>
    </main>
  );
}

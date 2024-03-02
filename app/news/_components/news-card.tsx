"use client";

//Libaries
import Image from "next/image";
//Components
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ButtonAppointment from "@/components/button-appointment";
import ButtonNews from "./buttonNews";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type NewsCardProps = {
  id: number;
  url: string;
  urlMobile: string;
  title?: string;
  alt?: string;
  createDate?: Date;
};

export default function NewsCard({
  imgObj,
}: {
  imgObj: NewsCardProps;
  disabled?: boolean;
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div>
        <CardContent className=" p-2">
          <div className="relative h-full md:w-full">
            <Image
              src={isMobile ? imgObj.urlMobile : imgObj.url}
              width={700}
              height={700}
              alt="News Tattoo Image"
              className="object-fill md:object-cover"
            />
            <CardTitle className="absolute  -right-0 flex w-full items-center justify-between bg-tattoo-black-1 object-cover px-10 py-6 align-middle font-sans text-lg text-yellow-50 md:-bottom-12 md:block md:w-5/12 lg:-bottom-16 lg:w-6/12">
              <div className="">{imgObj.title}</div>
              {imgObj.createDate && (
                <div className="hidden text-base text-tattoo-gray md:block md:py-4">
                  {imgObj.createDate.toLocaleDateString()}
                </div>
              )}
              <Link href={`/news/${imgObj.id}`}>
                <ButtonNews>READ NOW</ButtonNews>
              </Link>
            </CardTitle>
          </div>
        </CardContent>
      </div>
    </>
  );
}

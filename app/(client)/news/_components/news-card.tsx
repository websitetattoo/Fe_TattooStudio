"use client";

//Libaries
import React from "react";
import Image from "next/image";
import Link from "next/link";
//Components
import { CardContent, CardTitle } from "@/components/ui/card";
import { News } from "@/components/tables/news-tables/type/news";
import ButtonNews from "./buttonNews";

export default function NewsCard({
  imgObj,
  itemID,
}: {
  itemID: any;
  imgObj: News;
  disabled?: boolean;
}) {
  console.log(itemID);
  return (
    <>
      <div>
        <CardContent className=" p-2">
          <div className="relative m-auto h-full md:w-full">
            <Image
              src={imgObj.image}
              width={700}
              height={700}
              alt="News Tattoo Image"
              className="m-auto h-96 w-11/12 md:h-[300px] md:object-cover lg:w-4/5"
            />
            <CardTitle className="absolute  -right-0 flex w-full items-center justify-between bg-tattoo-black-1 object-cover px-10 py-6 align-middle font-sans text-lg text-yellow-50 md:-bottom-12 md:block md:w-5/12 lg:-bottom-16 lg:w-6/12">
              <span className="line-clamp-2 w-auto md:h-[56px]">
                {imgObj.title}
              </span>
              {imgObj.createdDate instanceof Date && (
                <div className="hidden text-base text-tattoo-gray md:block md:py-4">
                  {imgObj.createdDate.toLocaleDateString()}
                </div>
              )}
              <Link href={`/news/${itemID}`}>
                <ButtonNews>READ NOW</ButtonNews>
              </Link>
            </CardTitle>
          </div>
        </CardContent>
      </div>
    </>
  );
}

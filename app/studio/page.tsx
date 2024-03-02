"use client";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import Image from "next/image";
import { useEffect, useState } from "react";

const DashIcon = () => <div className="h-[2px] w-10 bg-red-600"></div>;

export default function Index() {
  const [location, setLocation] = useState("");
  const [imgUrl, setImgUrl] = useState<string>("/studio.png");

  useEffect(() => {}, []);

  return (
    <main className="container">
      <PageTitle className="gap-3">
        <span className="text-6xl font-bold text-tattoo-gray">
          Florida Kings
        </span>
        <HighlightText className="font-bold">Studio</HighlightText>
      </PageTitle>
      <div className="mt-8 flex flex-wrap justify-between text-[36px] tracking-widest text-tattoo-gray">
        <div className="my-8 flex w-full flex-col gap-4 lg:w-[49%]">
          <Image
            src={imgUrl}
            height={480}
            width={"600"}
            alt="studio"
            className="w-full object-cover"
            priority
          />
          <div className="flex w-full">
            <div className="flex items-center gap-2">
              <DashIcon />
              <span className="uppercase">Studio</span>
            </div>
          </div>
        </div>
        <div className="my-8 flex w-full flex-col gap-4 lg:w-[49%] lg:flex-col-reverse">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16796.10663024999!2d106.65527805673374!3d10.809930200947832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e2324759b7%3A0x6c91974ff86f05e3!2zQuG7h25oIHZp4buHbiBRdcOibiBZIDE3NQ!5e0!3m2!1svi!2s!4v1709355131989!5m2!1svi!2s"
            width="600"
            className="h-full min-h-[480px] w-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex w-full justify-start lg:justify-end">
            <div className="flex items-center gap-2 lg:flex-row-reverse lg:justify-end">
              <DashIcon />
              <span className="uppercase">Location</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import Link from "next/link";
import NewsCard from "./_components/news-card";

export default function index() {
  const newsList = [
    {
      id: 1,
      url: "/images/news-1.jpg",
      urlMobile: "/images/news-1-lc.jpg",
      title: "The Living Canvas: Tattoo Trends and ...",
      alt: "Image tattoo",
      createDate: new Date(),
    },
    {
      id: 2,
      url: "/images/news-2.jpg",
      urlMobile: "/images/news-2-lc.jpg",
      title: "The Living Canvas: Tattoo Trends and ...",
      alt: "Image tattoo",
      createDate: new Date(),
    },
    {
      id: 3,
      url: "/images/news-3.jpg",
      urlMobile: "/images/news-3-lc.jpg",
      title: "The Living Canvas: Tattoo Trends and ...",
      alt: "Image tattoo",
      createDate: new Date(),
    },
    {
      id: 4,
      url: "/images/news-4.jpg",
      urlMobile: "/images/news-4-lc.jpg",
      title: "The Living Canvas: Tattoo Trends and ...",
      alt: "Image tattoo",
      createDate: new Date(),
    },
  ];

  return (
    <div className="bg-tattoo-color-bg ">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <PageTitle>
          <HighlightText>NEWS</HighlightText>
        </PageTitle>
      </div>
      <div className=" -bottom-10 h-full w-full  flex-wrap  justify-center py-24 pt-12 md:flex  md:p-20 lg:flex">
        {newsList?.map((item, index) => (
          <div key={index} className="w-full p-4 py-12 md:w-10/12 lg:w-6/12">
            <NewsCard imgObj={item} disabled={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

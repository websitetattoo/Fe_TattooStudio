"use client";
import { News } from "@/components/tables/news-tables/type/news";
import http from "@/lib/http";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function index() {
  const [news, setNews] = useState<News>();
  const params = useParams();

  let formattedDate = new Date().toLocaleDateString();

  if (news) {
    const createdDate = new Date(news.createdDate);
    formattedDate = createdDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const getNewsById = async () => {
    const res = await http.get(`/news/${params.slug}`);
    const data = res.data;
    setNews(data);
  };

  useEffect(() => {
    getNewsById();
  }, []);

  return (
    <>
      {news && (
        <div>
          <div className="w-full justify-center">
            <h3 className="py-4 text-center text-lg text-tattoo-highlight lg:py-8">
              Florida Kings Magazine
            </h3>
            <h1 className="m-auto w-4/5 text-center text-lg font-medium text-white lg:w-full lg:text-3xl">
              {news.title}
            </h1>
            <h3 className="mt-2 text-center text-sm text-tattoo-gray lg:mt-3 lg:text-lg">
              {formattedDate}
            </h3>
            <div className="m-auto mt-8">
              <Image
                src={news.image}
                width={400}
                height={300}
                alt="News Tattoo Image"
                className="m-auto w-11/12 md:h-[600px] md:object-cover lg:w-4/5 lg:object-cover"
              />
            </div>
            <div className="m-auto mt-12 w-11/12 text-white lg:w-4/5">
              <ul
                className="pb-8 text-left text-sm md:text-xl lg:text-justify lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: news.content,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

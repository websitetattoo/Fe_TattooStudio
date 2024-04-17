"use client";

//Libaries
import { useEffect, useState } from "react";
//Query
import { useGetDataTatooCare } from "@/app/query/tattoo-care/useGetAllTattooCare";
//Types
import { Data, Tattoocare } from "@/app/types/type";

import PageTitle from "@/components/page-title";
import TextTattoo from "./_components/text-tattoo";

export default function index() {
  const [tatooCare, setTatooCare] = useState<Tattoocare[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading: loading } = useGetDataTatooCare();

  useEffect(() => {
    const dataTatooCare = (data as Data)?.data as Tattoocare[];
    setTatooCare(dataTatooCare);
    setIsLoading(loading);
  }, [data, isLoading]);

  return (
    <>
      <div className="m-auto w-9/12 py-24">
        <div className="mb-14">
          <PageTitle>
            <h1 className=" mb-8 text-center text-3xl font-bold text-tattoo-highlight md:text-4xl lg:text-6xl">
              TATTOO CARE
            </h1>
          </PageTitle>
        </div>

        <div>
          {tatooCare?.map((item, index) => (
            <TextTattoo key={index} textObj={item} />
          ))}
        </div>
      </div>
    </>
  );
}

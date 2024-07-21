"use client";
//Libaries
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
//Components
import PageTitle from "@/components/page-title";
import ArtistCard from "../_components/artist-card";
import ButtonAppointment from "@/components/button-appointment";
import ArtistInfo from "../_components/artist-info";
//Query
import { useGetDataArtistById } from "@/app/query/artist/useGetArtistById";
//Types
import { PropsArtist } from "@/app/types/type";

export default function index() {
  const params = useParams();
  const [Artist, setArtist] = useState<PropsArtist | null>(null);
  //useQuery
  const { data, isLoading } = useGetDataArtistById(params.slug?.toString());

  useEffect(() => {
    const artist = data as PropsArtist;
    setArtist(artist);
  }, [data, isLoading]);

  return (
    <>
      {Artist && (
        <div className="relative">
          <div className="m-auto w-10/12 md:w-full lg:w-9/12">
            <div className="relative pb-64 lg:pb-40">
              <PageTitle>
                <div className="pb-64"></div>
              </PageTitle>
              <div className="absolute top-8 md:left-44 md:w-[450px] lg:left-0 lg:w-96">
                <Image
                  src={Artist?.avatar}
                  width={400}
                  height={400}
                  alt="Tattoo Image"
                  className="w-full md:h-[600px] md:object-cover lg:object-cover"
                />
              </div>

              <div className="relative right-0 top-64 w-full md:relative md:m-auto md:mt-28 md:w-10/12 md:pt-0 lg:absolute lg:top-40 lg:w-9/12 lg:bg-tattoo-black-1 lg:p-8">
                <ArtistInfo employeeObj={Artist} />
              </div>
            </div>
            <div>
              <div className="mt-14 md:-mt-0 lg:mt-64">
                <div>
                  <h1 className="text-center text-2xl font-bold text-tattoo-gray md:mb-8 md:mt-20 md:text-4xl lg:text-4xl">
                    Tattoo <span className="text-tattoo-highlight">Work</span>
                  </h1>
                </div>
                <div className="mt-4 md:m-auto md:w-11/12 lg:mt-12 lg:w-full">
                  <div className="flex-wrap md:flex lg:flex">
                    {Artist?.images.map((item: any, index: number) => (
                      <div key={index} className="w-full md:w-1/4 lg:w-1/4">
                        <ArtistCard imgObj={item} disabled={false} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <PageTitle>
                  <div className="w-10/12 text-center text-lg font-medium text-white md:text-2xl lg:w-full lg:text-3xl">
                    <div className="mb-2">
                      <span> Want an appointment </span>
                      <span className="text-tattoo-highlight">
                        with Jessica Lauren?
                      </span>
                    </div>
                    <div>
                      <span>Let’s turn your idea into an artistic</span>
                      <span className="mt-2 lg:block">masterpiece now!</span>
                    </div>
                  </div>
                </PageTitle>
              </div>
              <div className="mt-4 flex justify-center pb-8 font-medium lg:mt-8">
                <Link href={"/contact"}>
                  <ButtonAppointment>book an appointment</ButtonAppointment>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

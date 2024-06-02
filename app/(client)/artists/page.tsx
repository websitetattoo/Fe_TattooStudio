"use client";
//Libaries
import Link from "next/link";
import { useEffect, useState } from "react";
//Components
import PageTitle from "@/components/page-title";
import ArtistCard from "./_components/artist-card";
import ButtonAppointment from "@/components/button-appointment";
//Query
import { useGetDataArtist } from "@/app/query/artist/useGetAllArtist";
//Types
import { Artist, Data } from "@/app/types/type";

export default function index() {
  const { data, isLoading: loading } = useGetDataArtist();
  const [Artist, setArtist] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataArtist = (data as Data)?.data as Artist[];
    setArtist(dataArtist);
    setIsLoading(loading);
  }, [data, isLoading]);

  return (
    <>
      <div className="pt-4">
        <div className="m-auto w-9/12 md:w-10/12 lg:w-9/12">
          <div>
            <PageTitle>
              <h1 className="mb-8 text-center text-3xl text-tattoo-gray md:text-5xl lg:text-5xl">
                <span>Choose</span>
                <span className="pl-2 font-medium text-tattoo-highlight">
                  Your Artist?
                </span>
              </h1>
            </PageTitle>

            <div className="m-auto my-3 md:w-4/5">
              <p className="text-center text-base leading-6 text-tattoo-gray md:text-center md:text-lg lg:text-lg">
                Unveil the magic behind the ink! Our tattoo team is a vibrant
                blend of visionary artists, each wielding a unique brush to turn
                your skin into a canvas of stories. Fueled by passion and armed
                with creativity, we&rsquo;re not just artists; we&rsquo;re the
                architects of your personal masterpiece. Embark on a journey
                with our extraordinary tattoo team, where imagination meets
                skill at Florida Kings!
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="md:flex lg:flex">
              {Artist?.map((item, index) => (
                <div key={index} className="w-full md:w-1/4 lg:w-1/4">
                  <Link href={`/artists/${item._id}`}>
                    <ArtistCard imgObj={item} disabled={true} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 pb-24">
            <div>
              <PageTitle>
                <p className="text-center text-lg text-white md:text-2xl lg:text-3xl">
                  <span className="mb-2 md:block lg:block">
                    Wanna have an amazing tattoo? Let’s turn your idea
                  </span>
                  <span className="ml-2 inline lg:block">
                    into an
                    <span className="mx-2 text-tattoo-highlight lg:mx-3">
                      artistic masterpiece
                    </span>
                    <span>now</span>
                  </span>
                </p>
              </PageTitle>
            </div>
            <div className="flex justify-center pb-8">
              <Link href={"/contact"}>
                <ButtonAppointment>book an appointment</ButtonAppointment>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

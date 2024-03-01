"use client";
//Libaries
import Image from "next/image";
//Components
import PageTitle from "@/components/page-title";
import ArtistCard from "../_components/artist-card";
import ButtonAppointment from "@/components/button-appointment";
import ArtistInfo from "../_components/artist-info";

export default function index() {
  const imgArr = [
    {
      id: 1,
      url: "/images/tattootImg.png",
    },
    {
      id: 2,
      url: "/images/tattootImg.png",
    },
    {
      id: 3,
      url: "/images/tattootImg.png",
    },
    {
      id: 4,
      url: "/images/tattootImg.png",
    },
    {
      id: 5,
      url: "/images/tattootImg.png",
    },
    {
      id: 6,
      url: "/images/tattootImg.png",
    },
    {
      id: 7,
      url: "/images/tattootImg.png",
    },
    {
      id: 8,
      url: "/images/tattootImg.png",
    },
  ];

  const infoEmployee = {
    id: 1,
    name: "Jessica Lauren",
    work: "Tattoo artist",
    description:
      "A seasoned tattoo artist known for her exceptional skill in turning concepts into captivating inked masterpieces. Whether it's intricate designs, vibrant colors, or meaningful symbols, her work reflects a mastery of the craft and a dedication to creating tattoos that resonate with her clients. With over 10 years in the industry, Jessica combines precision and creativity to bring your vision to life. Step into the studio to transform your ideas into timeless tattoos.",
    label: "jslauren_tattoo",
  };

  return (
    <>
      <div className="relative">
        <div className="absolute -right-3.5 top-96 overflow-hidden rounded-full bg-tattoo-highlight blur-[150px] md:-right-3.5 md:top-0 md:top-14 md:blur-[120px] lg:right-0 lg:top-28">
          <div className="lg:w-62 flex h-96 w-40 items-center justify-center md:w-32 lg:h-40"></div>
        </div>

        <div className="absolute left-1 top-96 hidden overflow-hidden rounded-full bg-tattoo-highlight blur-[240px] md:-left-28 md:top-[700px] md:block md:blur-[150px] lg:block">
          <div className="flex h-96 w-96 items-center justify-center md:w-40"></div>
        </div>

        <div className="m-auto w-10/12 md:w-full lg:w-9/12">
          <div className="relative pb-64 lg:pb-40">
            <PageTitle>
              <div className="pb-64"></div>
            </PageTitle>
            <div className="absolute top-8 md:left-44 md:w-[450px] lg:left-0 lg:w-96">
              <Image
                src="/images/TattooInfo.jpg"
                width={400}
                height={400}
                alt="Tattoo Image"
                className="w-full md:h-[600px] md:object-cover lg:object-cover"
              />
            </div>

            <div className="relative right-0 top-64 w-full md:relative md:m-auto md:mt-28 md:w-10/12 md:pt-0 lg:absolute lg:top-40 lg:w-9/12 lg:bg-tattoo-black-1 lg:p-8">
              <ArtistInfo employeeObj={infoEmployee} />
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
                  {imgArr?.map((item, index) => (
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
              <ButtonAppointment>book an appointment</ButtonAppointment>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

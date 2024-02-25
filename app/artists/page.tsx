"use client";

import ArtistCard from "./_components/artist-card";

export default function index() {

  const imgArr = [
    {
      id: 1,
      url: "/images/tattootImg.png"
    },
    {
      id: 2,
      url: "/images/tattootImg.png"
    },
    {
      id: 3,
      url: "/images/tattootImg.png"
    },
    {
      id: 4,
      url: "/images/tattootImg.png"
    }
  ]

  return (
    <>
      <div className="bg-tattoo-black-1 pt-16">
        <div className="m-auto lg:w-9/12 md:w-10/12 w-9/12">
          <div>
            <h1 className="text-center mb-8 lg:text-5xl md:text-5xl text-tattoo-gray text-3xl">
              <span>Choose</span>
              <span className="pl-2 font-medium text-tattoo-highlight">
                Your Artist?
              </span>
            </h1>
            <div className="m-auto my-3 md:w-4/5">
              <p className="text-center lg:text-lg md:text-lg leading-6 text-tattoo-gray md:text-center text-base">
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
            <div className="lg:flex md:flex">
            {imgArr?.map((item, index) => (
              <div key = {index} className="w-11/12 lg:w-1/4 md:w-1/4">
                <ArtistCard url={item.url}/>
              </div>
            ))}
              
            </div>
          </div>

          <div className="mt-20 pb-24">
            <div>
              <p className="text-center lg:text-3xl md:text-2xl text-lg text-white">
                <span className="lg:block md:block mb-2">Wanna have an amazing tattoo? Let’s turn your idea </span>
                <span className="ml-2 lg:block inline">
                  into an
                  <span className="lg:mx-3 mx-2 text-tattoo-highlight">
                    artistic masterpiece
                  </span>
                  <span>now</span>
                </span>
              </p>
            </div>
            <div className="flex justify-center py-8">
              <button className="bg-tattoo-highlight p-3 text-center lg:text-2xl md:text-xl text-sm text-white">
                BOOK AN APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

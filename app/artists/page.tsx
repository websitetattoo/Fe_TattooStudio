"use client";

import ArtistCard from "./_components/artist-card";

export default function index() {
  return (
    <>
      <div className="bg-tattoo-black-1 pt-16">
        <div className="m-auto w-9/12">
          <div>
            <h1 className="text-center text-5xl text-tattoo-gray">
              <span>Choose</span>
              <span className="pl-2 font-medium text-tattoo-highlight">
                Your Artist?
              </span>
            </h1>
            <div className="m-auto my-3 md:w-4/5">
              <p className="text-justify text-lg leading-6 text-tattoo-gray md:text-center">
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
            <div className="flex">
              <div className="w-1/4">
                <ArtistCard />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div>
              <p className="text-center text-5xl text-white">
                Wanna have an amazing tattoo? Let’s turn
                <span className="mt-2 block">
                  your idea into an
                  <span className="mx-3 text-tattoo-highlight">
                    artistic masterpiece
                  </span>
                  now!
                </span>
              </p>
            </div>
            <div className="flex justify-center py-8">
              <button className="bg-tattoo-highlight p-3 text-center text-2xl text-white">
                BOOK AN APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

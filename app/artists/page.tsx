"use client";

import ImgArtists from "./imgArtists/page";

export default function index() {
  return (
    <>
      <div className="bg-tattoo-black-1 mt-16">
        <div className="w-9/12 m-auto">
          <div>
            <h1 className="text-tattoo-gray text-5xl text-center">
              Choose
              <span className="text-tattoo-highlight font-medium">
                Your Artist?
              </span>
            </h1>
            <div className="my-3 w-4/5 m-auto">
              <p className="text-tattoo-gray text-lg leading-6 text-center">
                Unveil the magic behind the ink! Our tattoo team is a vibrant
                blend of visionary artists, each wielding a unique brush to turn
                your skin into a canvas of stories. Fueled by passion and armed
                with creativity, we're not just artists; we're the architects of
                your personal masterpiece. Embark on a journey with our
                extraordinary tattoo team, where imagination meets skill at
                Florida Kings!
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex">
              <div className="w-1/4">
                <ImgArtists />
              </div>
              <div className="w-1/4">
                <ImgArtists />
              </div>
              <div className="w-1/4">
                <ImgArtists />
              </div>
              <div className="w-1/4">
                <ImgArtists />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div>
              <p className="text-center text-5xl text-white">
                Wanna have an amazing tattoo? Let’s turn
                <span className="block mt-2">
                  your idea into an
                  <span className="text-tattoo-highlight mx-3">
                    artistic masterpiece
                  </span>
                  now!
                </span>
              </p>
            </div>
            <div className="flex justify-center my-8">
              <button className="text-center text-2xl bg-tattoo-highlight text-white p-3">
                BOOK AN APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

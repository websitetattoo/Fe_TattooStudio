"use client";

import Link from "next/link";
import { useState } from "react";
import { FacebookIcon, InstagramIcon } from "./icons";
import { CalendarMinus2, MapPin } from "lucide-react";
import Image from "next/image";

interface ContentProps {
  value: string;
  href: string;
  className?: string;
}

export default function Footer() {
  const [content, setContent] = useState<ContentProps[]>([
    {
      value: "FAQ",
      href: "/faq",
    },
    {
      value: "TATOO CARE",
      href: "/tattoo-care",
    },
    {
      value: "POLICIES",
      href: "/policies",
    },
  ]);
  return (
    <footer className="w-full flex-col justify-between bg-tattoo-black-2 font-sans text-[22px]">
      <div
        className="mx-auto flex w-4/5 flex-col justify-between border-b-[1px] border-tattoo-hr py-6 text-base text-white md:w-full lg:block"
        data-name="footer-nav"
      >
        <div className="flex flex-col items-center justify-between py-1 text-center text-base text-white lg:container lg:flex-row">
          <div>
            <Image
              src="/logo.png"
              alt="Logo"
              width="160"
              height={50}
              className=""
            />
          </div>
          <div className="py-4 text-tattoo-gray lg:text-base">
            <span className="font-bold text-white lg:text-tattoo-gray">
              ADDRESS:
            </span>
            <div className="flex py-1">
              <MapPin className="text-tattoo-highlight" />
              <div className="text-lg">
                <div className="address">
                  2620 Simpson Rd, Kissimmee, FL34744, United States
                </div>
                <div className="phone text-tattoo-highlight">
                  <span>Phone:</span>
                  <span className="phone-content text-tattoo-gray">
                    407-799-7181
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4" data-name="business-hours">
            <span className="font-bold">BUSINESS HOURS:</span>
            <div className="py-1 text-tattoo-gray">Daily open:9:00 - 20:00</div>
            <button className="flex w-full justify-around bg-tattoo-highlight p-3">
              <CalendarMinus2 className="text-white" />
              <span className="pl-1 font-bold">BOOK NOW</span>
            </button>
          </div>
          <div className="py-4" data-name="contact-us">
            <span className="font-bold">Contact Us:</span>
            <div className="py-1 text-tattoo-gray">
              Email: floriakingstatoo@gmail.com
            </div>
            <div
              className="flex justify-center py-4 md:justify-start lg:flex"
              data-name="social"
            >
              <span className="pr-1 font-bold text-black" data-name="instagram">
                <InstagramIcon />
              </span>
              <span data-name="facebook">
                <FacebookIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container flex items-center justify-center py-6 text-base md:text-[22px]"
        data-name="FAQ-Policies"
      >
        <div className="hidden w-1/2 items-center justify-center text-tattoo-gray md:flex lg:block">
          FLORIDA KINGS TATTOO, EST 2024, BASED IN LOS ANGELES, (CA)
        </div>
        <ul className="flex w-full justify-around text-white md:container lg:w-1/3">
          {content.map((c, index) => (
            <li key={index}>
              <Link href={c.href}>{c.value}</Link>
            </li>
          ))}
          <li className="text-tattoo-gray">&#169; 2024</li>
        </ul>
      </div>
    </footer>
  );
}

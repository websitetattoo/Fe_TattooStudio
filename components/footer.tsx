"use client";

import Link from "next/link";
import { useState } from "react";
import { FacebookIcon, InstagramIcon } from "./icons";
import { CalendarMinus2, MapPin } from "lucide-react";
import Image from "next/image";

interface ContentProps {
  value: string;
  href?: string;
  className?: string;
}

export default function Footer() {
  const [content, setContent] = useState<ContentProps[]>([
    {
      value: "FAQ",
      href: "faq"
    },
    {
      value: "TATOO CARE",
      href: "tatoo-care"
    },
    {
      value: "POLICIES",
      href: "policies"
    }
  ])
  return (
    <footer className="bg-tattoo-black-2 w-full py-6 flex-col justify-between font-sans text-[22px]">
      <div className="flex-col  lg:block text-white flex justify-between text-base border-tattoo-hr border-b-[1px] w-full" data-name="footer-nav">
        <div className="items-center text-center flex-col lg:flex-row lg:container text-white flex justify-between text-base py-1">
          {/* <Image src="/logo.png" alt="Logo" className="" /> */}
          <div className="lg:text-base text-tattoo-gray py-1" data-name='address'>
            <span className="text-white lg:text-tattoo-gray">ADDRESS:</span>
            <div className="flex py-1">
              <MapPin className="text-tattoo-highlight" />
              <div className="text-lg">
                <div className="address">2620 Simpson Rd, Kissimmee, FL34744, United States</div>
                <div className="phone text-tattoo-highlight">
                  <span>Phone:</span>
                  <span className="phone-content text-tattoo-gray">407-799-7181</span>
                </div>
              </div>
            </div>
          </div>
          <div className="" data-name='business-hours'>
            <span>BUSINESS HOURS:</span>
            <div className="text-tattoo-gray py-1">Daily open:9:00 - 20:00</div>
            <button className="bg-tattoo-highlight p-3 flex justify-between">
              <CalendarMinus2 className="text-white" />
              <span className="pl-1 font-bold">BOOK NOW</span>
            </button>
          </div>
          <div data-name='contact-us'>
            <span>Contact Us:</span>
            <div className="text-tattoo-gray py-1">Email: floriakingstatoo@gmail.com</div>
            <div className="justify-center flex lg:flex" data-name='social'>
              <span className="text-black font-bold pr-1" data-name='instagram'><InstagramIcon /></span>
              <span data-name='facebook'><FacebookIcon /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-center items-center" data-name="FAQ-Policies">
        <div className="hidden lg:block text-tattoo-gray w-1/2 flex justify-center items-center" >
          FLORIDA KINGS TATTOO, EST 2024, BASED IN LOS ANGELES, (CA)
        </div>
        <ul className="w-full text-base lg:w-1/3 container flex justify-between text-white">
          {content.map((c, index) => (
            <li key={index}><Link href={`/${c.href}`} className={c.className}>{c.value}</Link></li>
          ))}
          <li className="text-tattoo-gray">&#169; 2024</li>
        </ul>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MoreHorizonIcon,
  WhatsAppIcon,
  XIcon,
} from "./forms/icons";

interface SocialProps {
  icon: any;
  label: string;
  value: string;
  href?: string;
}

interface ArtistProps {
  icon: any;
  label: string;
  value: string;
  href?: string;
}

interface NavigationLink {
  label: string;
  href: string;
  children?: NavigationLink;
}

const navigateLinks: NavigationLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Artists",
    href: "/artists",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Studio",
    href: "/studio",
  },
  {
    label: "News",
    href: "/news",
  },
];

export default function Header() {
  const [social] = useState<SocialProps[]>([
    {
      icon: WhatsAppIcon,
      label: "Tel",
      value: "407-799-7181",
    },
    {
      icon: MailIcon,
      label: "Email",
      value: "floridakingstattoo@gmail.com",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: "Florida Kings Tattoo",
    },
    {
      icon: FacebookIcon,
      label: "Facebook",
      value: "Florida Kings Tattoo",
    },
  ]);

  const [artists, setArtists] = useState<ArtistProps[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <header className="w-full">
      <div className="w-full bg-tattoo-black-2" data-name="social-contact">
        <ul className="flex justify-start gap-2 py-2.5 text-[8px] text-white lg:container sm:justify-between sm:gap-0 lg:text-sm">
          {social.map((s, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <div className="rounded-full bg-white" data-name={s.label}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="flex">
                <span>{s.label}</span>
                <span className="hidden sm:inline-block">{`: ${s.value}`}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <nav className="w-full bg-tattoo-black-1" data-name="header-nav">
        <div className="container flex items-center justify-between py-[18px] text-tattoo-gray">
          <div className="hidden gap-8 lg:flex">
            <Link
              href="/artists"
              className="relative z-10 text-[22px] text-xl font-semibold uppercase transition-all duration-300 after:absolute after:inset-0 after:top-full after:z-0 after:h-1.5
              after:w-0 after:bg-tattoo-highlight after:transition-all after:duration-500 after:content-[''] hover:text-white hover:after:w-full"
            >
              ARTIST
            </Link>
            <Link
              href="/contact"
              className="relative z-10 text-[22px] text-xl font-semibold uppercase transition-all duration-300 after:absolute after:inset-0 after:top-full after:z-0 after:h-1.5
              after:w-0 after:bg-tattoo-highlight after:transition-all after:duration-500 after:content-[''] hover:text-white hover:after:w-full"
            >
              CONTACT
            </Link>
          </div>
          <div className="hover:cursor-pointer">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={136} height={69} />
            </Link>
          </div>
          <div className="hidden gap-8 lg:flex">
            <Link
              href="/studio"
              className="relative z-10 text-[22px] text-xl font-semibold uppercase transition-all duration-300 after:absolute after:inset-0 after:top-full after:z-0 after:h-1.5
              after:w-0 after:bg-tattoo-highlight after:transition-all after:duration-500 after:content-[''] hover:text-white hover:after:w-full"
            >
              STUDIO
            </Link>
            <Link
              href="/news"
              className="relative z-10 text-[22px] text-xl font-semibold uppercase transition-all duration-300 after:absolute after:inset-0 after:top-full after:z-0 after:h-1.5
              after:w-0 after:bg-tattoo-highlight after:transition-all after:duration-500 after:content-[''] hover:text-white hover:after:w-full"
            >
              NEWS
            </Link>
          </div>
          <div className="block lg:hidden">
            <Drawer direction="right" open={open} onOpenChange={setOpen}>
              <DrawerTrigger>
                <MoreHorizonIcon />
              </DrawerTrigger>
              <DrawerContent className="h-full text-white opacity-80">
                <div className="mx-auto w-4/5">
                  <DrawerHeader className="flex justify-between">
                    <Image src="/logo.png" alt="logo" width={136} height={69} />
                    <DrawerClose>
                      <XIcon />
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="mx-auto mt-8 opacity-100">
                    <ul className="">
                      {navigateLinks.map((link, idx) => (
                        <DrawerClose
                          key={idx}
                          className="w-full text-start"
                          onClick={handleCloseDrawer}
                        >
                          <li className="relative mb-4 h-7 no-underline hover:text-tattoo-black-1">
                            <Link
                              href={link.href}
                              className="absolute z-10 block text-xl font-bold uppercase "
                            >
                              {link.label}
                            </Link>
                            <div
                              className="absolute inset-0 bg-transparent transition-all duration-500 before:absolute before:inset-0 before:z-0 before:w-0
                               before:bg-tattoo-highlight before:transition-all before:duration-500 before:content-[''] hover:before:w-full"
                            ></div>
                          </li>
                        </DrawerClose>
                      ))}
                    </ul>
                  </div>
                  <DrawerFooter>
                    <h1 className="text-2xl uppercase">
                      FLORIDA KINGS TATTOO, EST, {new Date().getFullYear()}.
                      BASED IN LOS ANGELES, (CA)
                    </h1>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </nav>
    </header>
  );
}

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
import { FacebookIcon, MoreHorizonIcon, XIcon } from "./icons";

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
      icon: <FacebookIcon />,
      label: "Tel",
      value: "407-799-7181",
    },
    {
      icon: <FacebookIcon />,
      label: "Email",
      value: "floridakingstattoo@gmail.com",
    },
    {
      icon: <FacebookIcon />,
      label: "Instagram",
      value: "Florida Kings Tattoo",
    },
    {
      icon: <FacebookIcon />,
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
      <div className="bg-tattoo-black-2 w-full" data-name="social-contact">
        <ul className="lg:container flex justify-between text-white text-sm py-3">
          {social.map((s, idx) => (
            <li key={idx} className="flex items-center">
              {s.icon}
              <span className="text-sm hidden md:inline-block">
                {s.label}: {s.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <nav className="bg-tattoo-black-1 w-full" data-name="header-nav">
        <div className="container flex justify-between items-center text-tattoo-gray py-[18px]">
          <div className="hidden lg:flex gap-8">
            <Link href="/artists" className="uppercase text-[22px]">
              ARTIST
            </Link>
            <Link href="/contact" className="uppercase text-[22px]">
              CONTACT
            </Link>
          </div>
          <div className="hover:cursor-pointer">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={136} height={69} />
            </Link>
          </div>
          <div className="hidden gap-8 lg:flex">
            <Link href="/studio" className="uppercase text-[22px]">
              STUDIO
            </Link>
            <Link href="/news" className="uppercase text-[22px]">
              NEWS
            </Link>
          </div>
          <div className="block lg:hidden">
            <Drawer direction="right" open={open} onOpenChange={setOpen}>
              <DrawerTrigger>
                <MoreHorizonIcon />
              </DrawerTrigger>
              <DrawerContent className="h-full opacity-80 text-white">
                <div className="w-4/5 mx-auto">
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
                          <li className="no-underline mb-4">
                            <Link
                              href={link.href}
                              className="uppercase font-bold text-xl block"
                            >
                              {link.label}
                            </Link>
                            <hr className="mt-3" />
                          </li>
                        </DrawerClose>
                      ))}
                    </ul>
                  </div>
                  <DrawerFooter>
                    <h1 className="uppercase text-2xl">
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

"use client";

import { useState } from "react";

interface SocialProps {
  icon: any;
  label: string;
  value: string;
  href?: string;
}

export default function Header() {
  const [social, setSocial] = useState<SocialProps[]>([
    {
      icon: null,
      label: "Tel",
      value: "407-799-7181",
    },
    {
      icon: null,
      label: "Email",
      value: "floridakingstattoo@gmail.com",
    },
    {
      icon: null,
      label: "Instagram",
      value: "Florida Kings Tattoo",
    },
    {
      icon: null,
      label: "Facebook",
      value: "Florida Kings Tattoo",
    },
  ]);

  return (
    <header className="w-full">
      <div className="bg-tattoo-black-2 w-full" data-name="social-contact">
        <ul className="container flex justify-between text-white font-">
          {social.map((s, idx) => (
            <li key={idx}>
              {s.icon} {s.label}: {s.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-tattoo-black-1 w-full" data-name="header-nav">
        <div className="container"></div>
      </div>
    </header>
  );
}

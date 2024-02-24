"use client";

import { useState } from "react";

interface SocialProps {
  icon: any;
  label: string;
  value: string;
}

export default function Header() {
  const [social, setSocial] = useState<SocialProps>();

  return (
    <header className="w-full">
      <div className="bg-tattoo-black-2 w-full" data-name="social-contact">
        <div className="container flex justify-between"></div>
      </div>
      <div className="bg-tattoo-black-1 w-full" data-name="header-nav">
        <div className="container"></div>
      </div>
    </header>
  );
}

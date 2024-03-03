import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed left-0 right-0 top-0 z-20 border-b backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href="/backend">
            <Image src="/logo.png" alt="logo" height={40} width={100} />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
      </nav>
    </div>
  );
}

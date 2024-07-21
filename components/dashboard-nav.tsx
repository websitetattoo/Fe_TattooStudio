"use client";
//Libaries
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { Icons } from "@/components/forms/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/constants/data";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
  };

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/login" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-indigo-100",
                  path === item.href ? "bg-indigo-100" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
      {/* Handle Logout */}
      <Link href="/login">
        <span
          className={cn(
            "hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-indigo-100",
            path === "/logout" ? "bg-accent" : "transparent",
          )}
          onClick={() => {
            if (setOpen) setOpen(false);
            handleLogout();
          }}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </span>
      </Link>
    </nav>
  );
}

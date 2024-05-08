import { Icons } from "@/components/forms/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/backend",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/backend/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Artists",
    href: "/backend/artists",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Policies",
    href: "/backend/policies",
    icon: "policy",
    label: "policies",
  },
  {
    title: "Tattoo Care",
    href: "/backend/tattoo-care",
    icon: "TattooCare",
    label: "TattooCare",
  },
  {
    title: "Faq",
    href: "/backend/faq",
    icon: "Faq",
    label: "Faq",
  },
  {
    title: "News",
    href: "/backend/news",
    icon: "news",
    label: "news",
  },
  {
    title: "Booking",
    href: "/backend/booking",
    icon: "booking",
    label: "booking",
  },
];

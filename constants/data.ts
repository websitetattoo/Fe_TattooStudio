import { Icons } from "@/components/forms/icons";

export type Policies = {
  title: string;
  content: string;
  subtitle: string;
  isSubTitle: boolean;
  isImportant: boolean;
};

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
    title: "News",
    href: "/backend/news",
    icon: "news",
    label: "news",
  },
  {
    title: "Logout",
    href: "/",
    icon: "login",
    label: "login",
  },
];

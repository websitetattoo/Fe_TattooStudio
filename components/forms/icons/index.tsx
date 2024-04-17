import {
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoardIcon,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  LayoutDashboardIcon,
  Loader2,
  LogIn,
  LucideIcon,
  LucideProps,
  Moon,
  MoreVertical,
  NotebookText,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  User2Icon,
  UserX2Icon,
  X,
} from "lucide-react";

export const Icons = {
  dashboard: LayoutDashboardIcon,
  logo: Command,
  login: LogIn,
  close: X,
  profile: User2Icon,
  spinner: Loader2,
  kanban: CircuitBoardIcon,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  employee: UserX2Icon,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  twitter: Twitter,
  check: Check,
  policy: NotebookText,
  TattooCare: NotebookText,
  news: BookOpenText,
};

import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FacebookIcon: FC<IconProps> = ({ className = "", style = {} }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    style={style}
    className={twMerge(
      "h-8 w-8 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
      className,
    )}
    aria-hidden="true"
  >
    <circle
      xmlns="http://www.w3.org/2000/svg"
      cx="12"
      cy="12"
      r="12"
      fill="white"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M13.3334 13H15.0001L15.6667 10.3333H13.3334V8.99999C13.3334 8.31333 13.3334 7.66666 14.6667 7.66666H15.6667V5.42666C15.4494 5.39799 14.6287 5.33333 13.7621 5.33333C11.9521 5.33333 10.6667 6.43799 10.6667 8.46666V10.3333H8.66675V13H10.6667V18.6667H13.3334V13Z"
      fill="black"
    />
  </svg>
);

export const InstagramIcon: FC<IconProps> = ({
  className = "",
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    style={style}
    className={twMerge(
      "h-8 w-8 dark:text-gray-300 dark:hover:text-white",
      className,
    )}
  >
    <circle cx="12" cy="12" r="12" fill="white" />
    <path
      d="M9.06 5H14.94C17.18 5 19 6.82 19 9.06V14.94C19 16.0168 18.5723 17.0495 17.8109 17.8109C17.0495 18.5723 16.0168 19 14.94 19H9.06C6.82 19 5 17.18 5 14.94V9.06C5 7.98322 5.42775 6.95054 6.18915 6.18915C6.95054 5.42775 7.98322 5 9.06 5ZM8.92 6.4C8.25165 6.4 7.61068 6.6655 7.13809 7.13809C6.6655 7.61068 6.4 8.25165 6.4 8.92V15.08C6.4 16.473 7.527 17.6 8.92 17.6H15.08C15.7483 17.6 16.3893 17.3345 16.8619 16.8619C17.3345 16.3893 17.6 15.7483 17.6 15.08V8.92C17.6 7.527 16.473 6.4 15.08 6.4H8.92ZM15.675 7.45C15.9071 7.45 16.1296 7.54219 16.2937 7.70628C16.4578 7.87038 16.55 8.09294 16.55 8.325C16.55 8.55706 16.4578 8.77962 16.2937 8.94372C16.1296 9.10781 15.9071 9.2 15.675 9.2C15.4429 9.2 15.2204 9.10781 15.0563 8.94372C14.8922 8.77962 14.8 8.55706 14.8 8.325C14.8 8.09294 14.8922 7.87038 15.0563 7.70628C15.2204 7.54219 15.4429 7.45 15.675 7.45ZM12 8.5C12.9283 8.5 13.8185 8.86875 14.4749 9.52513C15.1313 10.1815 15.5 11.0717 15.5 12C15.5 12.9283 15.1313 13.8185 14.4749 14.4749C13.8185 15.1313 12.9283 15.5 12 15.5C11.0717 15.5 10.1815 15.1313 9.52513 14.4749C8.86875 13.8185 8.5 12.9283 8.5 12C8.5 11.0717 8.86875 10.1815 9.52513 9.52513C10.1815 8.86875 11.0717 8.5 12 8.5ZM12 9.9C11.443 9.9 10.9089 10.1212 10.5151 10.5151C10.1212 10.9089 9.9 11.443 9.9 12C9.9 12.557 10.1212 13.0911 10.5151 13.4849C10.9089 13.8788 11.443 14.1 12 14.1C12.557 14.1 13.0911 13.8788 13.4849 13.4849C13.8788 13.0911 14.1 12.557 14.1 12C14.1 11.443 13.8788 10.9089 13.4849 10.5151C13.0911 10.1212 12.557 9.9 12 9.9Z"
      fill="black"
    />
  </svg>
);

export const MailIcon: FC<IconProps> = ({ className = "", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    style={style}
    className={twMerge(
      "h-8 w-8 dark:text-gray-300 dark:hover:text-white",
      className,
    )}
  >
    <circle cx="12" cy="12" r="12" fill="white" />
    <path
      d="M18.6667 8.00001C18.6667 7.26667 18.0667 6.66667 17.3334 6.66667H6.66671C5.93337 6.66667 5.33337 7.26667 5.33337 8.00001V16C5.33337 16.7333 5.93337 17.3333 6.66671 17.3333H17.3334C18.0667 17.3333 18.6667 16.7333 18.6667 16V8.00001ZM17.3334 8.00001L12 11.3333L6.66671 8.00001H17.3334ZM17.3334 16H6.66671V9.33334L12 12.6667L17.3334 9.33334V16Z"
      fill="black"
    />
  </svg>
);

export const WhatsAppIcon: FC<IconProps> = ({ className = "", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    style={style}
    className={twMerge(
      "h-8 w-8 dark:text-gray-300 dark:hover:text-white",
      className,
    )}
  >
    <circle cx="12" cy="12" r="12" fill="white" />
    <path
      d="M16.7 7.27334C16.0888 6.65595 15.3608 6.16645 14.5585 5.83337C13.7561 5.50029 12.8954 5.33031 12.0267 5.33334C8.3867 5.33334 5.42003 8.3 5.42003 11.94C5.42003 13.1067 5.7267 14.24 6.30003 15.24L5.3667 18.6667L8.8667 17.7467C9.83337 18.2733 10.92 18.5533 12.0267 18.5533C15.6667 18.5533 18.6334 15.5867 18.6334 11.9467C18.6334 10.18 17.9467 8.52 16.7 7.27334ZM12.0267 17.4333C11.04 17.4333 10.0734 17.1667 9.2267 16.6667L9.0267 16.5467L6.9467 17.0933L7.50003 15.0667L7.3667 14.86C6.81853 13.9846 6.52746 12.9728 6.5267 11.94C6.5267 8.91334 8.99337 6.44667 12.02 6.44667C13.4867 6.44667 14.8667 7.02 15.9 8.06C16.4117 8.56931 16.8172 9.17511 17.093 9.84229C17.3688 10.5095 17.5094 11.2247 17.5067 11.9467C17.52 14.9733 15.0534 17.4333 12.0267 17.4333ZM15.04 13.3267C14.8734 13.2467 14.06 12.8467 13.9134 12.7867C13.76 12.7333 13.6534 12.7067 13.54 12.8667C13.4267 13.0333 13.1134 13.4067 13.02 13.5133C12.9267 13.6267 12.8267 13.64 12.66 13.5533C12.4934 13.4733 11.96 13.2933 11.3334 12.7333C10.84 12.2933 10.5134 11.7533 10.4134 11.5867C10.32 11.42 10.4 11.3333 10.4867 11.2467C10.56 11.1733 10.6534 11.0533 10.7334 10.96C10.8134 10.8667 10.8467 10.7933 10.9 10.6867C10.9534 10.5733 10.9267 10.48 10.8867 10.4C10.8467 10.32 10.5134 9.50667 10.38 9.17334C10.2467 8.85334 10.1067 8.89334 10.0067 8.88667H9.6867C9.57337 8.88667 9.40003 8.92667 9.2467 9.09334C9.10003 9.26 8.67337 9.66 8.67337 10.4733C8.67337 11.2867 9.2667 12.0733 9.3467 12.18C9.4267 12.2933 10.5134 13.96 12.1667 14.6733C12.56 14.8467 12.8667 14.9467 13.1067 15.02C13.5 15.1467 13.86 15.1267 14.1467 15.0867C14.4667 15.04 15.1267 14.6867 15.26 14.3C15.4 13.9133 15.4 13.5867 15.3534 13.5133C15.3067 13.44 15.2067 13.4067 15.04 13.3267Z"
      fill="black"
    />
  </svg>
);

export const MoreHorizonIcon: FC<IconProps> = ({
  className = "",
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={twMerge(
      "h-8 w-8 dark:text-gray-300 dark:hover:text-white",
      className,
    )}
  >
    <line x1="3" x2="21" y1="6" y2="6" />
    <line x1="3" x2="21" y1="12" y2="12" />
    <line x1="3" x2="21" y1="18" y2="18" />
  </svg>
);

export const XIcon: FC<IconProps> = ({ className = "", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={twMerge(
      "lucide lucide-x h-12 w-12 dark:text-gray-300 dark:hover:text-white",
      className,
    )}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

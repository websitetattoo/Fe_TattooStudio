import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Florida Tattoo Kings Admin",
  description: "Florida Tattoo Kings Admin Page",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main
          className="scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded 
          scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded lg:supports-scrollbars:pr-2 w-full overflow-y-auto pt-16 "
        >
          {children}
        </main>
      </div>
    </>
  );
}

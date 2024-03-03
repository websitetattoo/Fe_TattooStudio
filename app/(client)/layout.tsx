import Footer from "@/components/footer";
import Header from "@/components/header";
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
      <div className="bg-tattoo-black-2">{children}</div>
      <Footer />
    </>
  );
}

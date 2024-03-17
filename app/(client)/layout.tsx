import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Florida Tattoo Kings Admin",
  description: "Florida Tattoo Kings Admin Page",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-tattoo-color-bg">{children}</main>
      <Footer />
    </>
  );
}

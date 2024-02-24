import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tattoos Web",
  description: "Đây là trang Web Tattoos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <body className={inter.className}>
        {/* <Providers> */}
        <Header />
        <div className="bg-tattoo-black-2">{children}</div>
        <Footer />
        {/* </Providers> */}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/lib/providers";

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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/logo.png" type="image/*" />
      </head>
      <body className={inter.className}>
        <div>
          <Provider>{children}</Provider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

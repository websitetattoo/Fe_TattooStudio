"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient } from "react-query";
import Provider from "@/lib/providers";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
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

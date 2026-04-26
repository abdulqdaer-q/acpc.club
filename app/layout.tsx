import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./globals.css";

const cairo = localFont({
  src: [
    {
      path: "./fonts/Cairo-Regular.ttf",
      style: "normal",
      weight: "400"
    },
    {
      path: "./fonts/Cairo-SemiBold.ttf",
      style: "normal",
      weight: "600"
    },
    {
      path: "./fonts/Cairo-Bold.ttf",
      style: "normal",
      weight: "700"
    }
  ],
  display: "swap",
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://acpc.club"),
  title: "Aleppo CPC",
  description:
    "Official website of Aleppo CPC, the competitive programming club at the University of Aleppo."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.className} ${cairo.variable}`}>{children}</body>
    </html>
  );
}

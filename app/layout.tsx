import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

// https://stackoverflow.com/questions/75203657/adding-multiple-local-fonts-to-nextjs-13
const motivaSansRegular = localFont({
  src: "../public/Fonts/MotivaSansRegular.woff.ttf",
});

export const metadata: Metadata = {
  title: "backlog",
  description: "Made by Min",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={motivaSansRegular.className}>{children}</body>
    </html>
  );
}

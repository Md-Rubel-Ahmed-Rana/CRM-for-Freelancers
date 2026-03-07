import PageMetadata from "@/common/PageMetadata";
import Home from "@/features/home";
import RootLayout from "@/layout/RootLayout";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactElement } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <>
      <PageMetadata />
      <div
        className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
      >
        <Home />
      </div>
    </>
  );
}

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

import React from "react";
import localFont from "next/font/local";

const savior = localFont({ src: "../../public/Savior4.ttf" });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${savior.className} select-none bg-black`}
    >
      {children}
    </main>
  );
}

import React from "react";
import localFont from "next/font/local";

const savior = localFont({ src: "../../public/Savior4.ttf" });

type Props = {
  children: React.ReactNode;
  backgroundImg?: string;
};

export default function Layout({ children, backgroundImg }: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-end ${savior.className} select-none bg-black`}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "luminosity",
      }}
    >
      {children}
    </main>
  );
}

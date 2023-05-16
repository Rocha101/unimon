import React from "react";

type Props = {
  children: React.ReactNode;
  backgroundImg?: string;
};

export default function Layout({ children, backgroundImg }: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center select-none bg-black`}
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

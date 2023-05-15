import React, { useEffect } from "react";
import localFont from "next/font/local";

const savior = localFont({ src: "../../public/Savior4.ttf" });

type Props = {
  children: React.ReactNode;
  backgroundImg?: string;
  secondplayer?: boolean;
};

export default function Layout({
  children,
  backgroundImg,
  secondplayer,
}: Props) {
  const [style, setStyle] = React.useState<string>("");

  useEffect(() => {
    if (secondplayer) {
      setStyle(
        `flex min-h-screen w-full hidden md:flex flex-col items-center justify-end ${savior.className} select-none bg-black`
      );
    } else {
      setStyle(
        `flex min-h-screen w-full flex flex-col items-center justify-end ${savior.className} select-none bg-black`
      );
    }
  }, [secondplayer]);
  return (
    <main
      className={style}
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

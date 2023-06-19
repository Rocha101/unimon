import React, { useEffect } from "react";

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
        `flex min-h-screen bg-gray-700 border-4 border-gray-800  w-full hidden md:flex flex-col items-center justify-end select-none bg-black`
      );
    } else {
      setStyle(
        `flex min-h-screen bg-gray-700 border-4 border-gray-800 w-full flex flex-col items-center justify-end select-none bg-black`
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

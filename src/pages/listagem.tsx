import Layout from "@/components/Layout";
import React from "react";

type Props = {};

export default function Listagem({}: Props) {
  const Link =
    "text-gray-300 hover:text-gray-900 text-3xl hover:bg-gray-100 rounded-lg px-2 py-1 my-2 active:bg-gray-300";

  function handleSubmit(unimon: string) {
    console.log("Clicou");
    window.location.href = `/battle/${unimon}`;
  }

  return (
    <Layout>
      <div className="text-white">
        <h1 className="text-5xl">Listagem</h1>
        <ul>
          <li className={Link} onClick={() => handleSubmit("Charizard")}>
            Charizard
          </li>
          <li className={Link} onClick={() => handleSubmit("Squirtle")}>
            Squirtle
          </li>
        </ul>
      </div>
    </Layout>
  );
}

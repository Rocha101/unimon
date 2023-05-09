import ItemsAcoes from "@/components/ItemsAcoes";
import Layout from "@/components/Layout";
import Status from "@/components/Status";
import React from "react";

type Props = {};

function ActionBar() {
  return (
    <div className="bg-gray-300 h-2/5 w-full absolute bottom-0 p-8 flex flex-row gap-8">
      <div className="w-1/5">
        <h2 className="text-3xl">Ações</h2>
        <ul className="flex flex-col gap-3">
          <ItemsAcoes icon="👊">Atacar</ItemsAcoes>
          <ItemsAcoes icon="🛡️">Defender</ItemsAcoes>
          <ItemsAcoes icon="🔥">Ataque Especial</ItemsAcoes>
          <ItemsAcoes icon="🛡️">Defesa Especial</ItemsAcoes>
          <ItemsAcoes icon="🏃">Fugir</ItemsAcoes>
        </ul>
      </div>
      <div className="w-4/5">
        <Status label="Vida" color="bg-red-500" pct={50} />
        <Status label="Força" color="bg-blue-500" pct={20} />
      </div>
    </div>
  );
}

export default function Charizard({}: Props) {
  return (
    <Layout>
      <h1 className="text-white text-5xl">Charizard</h1>
      <ActionBar />
    </Layout>
  );
}

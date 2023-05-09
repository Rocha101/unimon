import BattleField from "@/components/BattleField";
import ItemsAcoes from "@/components/ItemsAcoes";
import Layout from "@/components/Layout";
import Status from "@/components/Status";
import React from "react";

type Props = {};

function ActionBar() {
  return (
    <div className="bg-gray-300 h-2/5 w-full p-4 flex flex-row gap-4 border-t-4 border-gray-800">
      <div className="w-2/5">
        <h2 className="text-3xl">Ações</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ItemsAcoes icon="👊">Atacar</ItemsAcoes>
          <ItemsAcoes icon="🛡️">Defender</ItemsAcoes>
          <ItemsAcoes icon="🔥">Ataque Especial</ItemsAcoes>
          <ItemsAcoes icon="🏃">Fugir</ItemsAcoes>
        </ul>
      </div>
      <div className="w-3/5">
        <Status label="Vida" color="bg-red-500" pct={50} />
        <Status label="Força" color="bg-blue-500" pct={20} />
      </div>
    </div>
  );
}

export default function Charizard({}: Props) {
  return (
    <Layout backgroundImg="/Arena.jpg">
      <BattleField
        attacker={<img src="/Squirtle.webp" alt="Squirtle" width={200} />}
        defender={<img src="/CharizardBack.png" alt="Charizard" width={200} />}
      />
      <ActionBar />
    </Layout>
  );
}

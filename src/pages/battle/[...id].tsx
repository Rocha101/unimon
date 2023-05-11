import BattleField from "@/components/BattleField";
import ItemsAcoes from "@/components/ItemsAcoes";
import LayoutBattle from "@/components/LayoutBattle";
import Status from "@/components/Status";
import React from "react";
import { useParams } from "next/navigation";
import { PokemonClient } from "pokenode-ts";
import { useRouter } from "next/router";

type Props = {};

function ActionBar() {
  return (
    <div className="bg-gray-300 h-2/5 w-full p-4 flex flex-row gap-4 border-t-4 border-gray-800">
      <div className="w-2/5">
        <h2 className="text-3xl">Ações</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ItemsAcoes icon="👊" key="KeyA">
            <div>Atacar</div>{" "}
            <div className="text-gray-500 hidden md:block">Tecla A</div>
          </ItemsAcoes>
          <ItemsAcoes icon="🛡️" key="d">
            Defender{" "}
            <span className="text-gray-500 hidden md:block">Tecla D</span>
          </ItemsAcoes>
          <ItemsAcoes icon="🔥" key="s">
            Ataque Especial{" "}
            <span className="text-gray-500 hidden md:block">Tecla S</span>
          </ItemsAcoes>
          <ItemsAcoes icon="🏃" key="f">
            Fugir <span className="text-gray-500 hidden md:block">Tecla F</span>
          </ItemsAcoes>
        </ul>
      </div>
      <div className="w-3/5">
        <Status label="Vida" color="bg-red-500" pct={50} />
        <Status label="Força" color="bg-blue-500" pct={20} />
      </div>
    </div>
  );
}

export default function Battle({}: Props) {
  const router = useRouter();
  const { slug, id } = router.query;

  const [attacker, setAttacker] = React.useState<
    { pokeName: string; sprite: string | null } | undefined
  >();

  const [defender, setDefender] = React.useState<
    { pokeName: string; sprite: string | null } | undefined
  >();

  (async () => {
    if (!id) return;
    const api = new PokemonClient();

    await api
      .getPokemonByName(id[0])
      .then((data) =>
        setAttacker({ pokeName: data.name, sprite: data.sprites.back_default })
      )
      .catch((error) => console.error(error));

    await api
      .getPokemonByName(id[1])
      .then((data) =>
        setDefender({ pokeName: data.name, sprite: data.sprites.front_default })
      )
      .catch((error) => console.error(error));
  })();

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "a") {
          alert("Atacou");
        }
        if (event.key === "d") {
          alert("Defendeu");
        }
        if (event.key === "s") {
          alert("Ataque especial");
        }
        if (event.key === "f") {
          alert("Fugiu");
        }
      }}
      tabIndex={0}
    >
      <LayoutBattle>
        <BattleField
          attacker={
            <img
              src={defender?.sprite || "/Pokeball.webp"}
              alt={defender?.pokeName}
              width={200}
            />
          }
          defender={
            <img
              src={attacker?.sprite || "/Pokeball.webp"}
              alt={attacker?.pokeName}
              width={200}
            />
          }
        />
        <ActionBar />
      </LayoutBattle>
    </div>
  );
}

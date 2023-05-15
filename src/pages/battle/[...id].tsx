/* eslint-disable @next/next/no-img-element */
import BattleField from "@/components/BattleField";
import ItemsAcoes from "@/components/ItemsAcoes";
import LayoutBattle from "@/components/LayoutBattle";
import Status from "@/components/Status";
import React from "react";
import { useParams } from "next/navigation";
import { PokemonClient } from "pokenode-ts";
import { useRouter } from "next/router";

function MenuBattle() {
  return (
    <div className="bg-black h-full w-full p-4 flex flex-col justify-center align-middle">
      <div
        className="
        bg-gray-300 text-black w-3/5
      "
      >
        <h1>
          {} vs {}
        </h1>
        <h2>{} ganhou!</h2>
        <div>
          <p>Deseja Recomeçar ou Sair?</p>
        </div>
        <div>
          <button>Recomeçar</button>
          <button onClick={() => window.history.back()}>Sair</button>
        </div>
      </div>
    </div>
  );
}

function ActionBar({
  secondplayer,
  vida,
  forca,
}: {
  secondplayer?: boolean;
  vida: number;
  forca: number;
}) {
  return (
    <div className="bg-gray-300 h-2/5 w-full p-4 flex flex-row gap-4 border-t-4 border-gray-800">
      <div className="w-2/5">
        <h2 className="text-3xl">Ações</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ItemsAcoes icon="👊" key={secondplayer ? "SetaEsquerda" : "KeyA"}>
            <div>Atacar</div>{" "}
            <div className="text-gray-500 hidden md:block">
              {secondplayer ? "⬅️" : "Tecla A"}
            </div>
          </ItemsAcoes>
          <ItemsAcoes icon="🛡️" key="d">
            Defender{" "}
            <span className="text-gray-500 hidden md:block">
              {secondplayer ? "⬇️" : "Tecla D"}
            </span>
          </ItemsAcoes>
          <ItemsAcoes icon="🔥" key="s">
            Especial{" "}
            <span className="text-gray-500 hidden md:block">
              {secondplayer ? "➡️" : "Tecla S"}
            </span>
          </ItemsAcoes>
          <ItemsAcoes icon="🏃" key="f">
            Fugir{" "}
            <span className="text-gray-500 hidden md:block">
              {secondplayer ? "⬆️" : "Tecla F"}
            </span>
          </ItemsAcoes>
        </ul>
      </div>
      <div className="w-3/5">
        <Status label="Vida" color="bg-red-500" pct={vida} />
        <Status label="Força" color="bg-blue-500" pct={forca} />
      </div>
    </div>
  );
}

export default function Battle({}) {
  const router = useRouter();
  const { slug, id } = router.query;

  const [attacker, setAttacker] = React.useState<
    | {
        pokeName: string;
        spriteFront: string | null;
        spriteBack: string | null;
      }
    | undefined
  >();

  const [defender, setDefender] = React.useState<
    | {
        pokeName: string;
        spriteFront: string | null;
        spriteBack: string | null;
      }
    | undefined
  >();

  (async () => {
    if (!id) return;
    const api = new PokemonClient();

    await api
      .getPokemonByName(id[0])
      .then((data) =>
        setAttacker({
          pokeName: data.name,
          spriteBack: data.sprites.back_default,
          spriteFront: data.sprites.front_default,
        })
      )
      .catch((error) => console.error(error));

    await api
      .getPokemonByName(id[1])
      .then((data) =>
        setDefender({
          pokeName: data.name,
          spriteFront: data.sprites.front_default,
          spriteBack: data.sprites.back_default,
        })
      )
      .catch((error) => console.error(error));
  })();

  const [player1, setPlayer1] = React.useState({
    life: 100,
    force: 100,
  });

  const [player2, setPlayer2] = React.useState({
    life: 100,
    force: 100,
  });

  const [menu, setMenu] = React.useState(false);

  function handleKeyDown(
    event: { key: string },
    player1: { life: number },
    player2: { life: number }
  ) {
    if (event.key === "a") {
      player2.life = player2.life - 10;
    }
    if (event.key === "d") {
      player1.life = player1.life + 10;
    }
    if (event.key === "s") {
      player2.life = player2.life - 20;
    }
    if (player2.life <= 0) {
      alert("Player 1 venceu!");
      setMenu(true);
    }
    if (player1.life <= 0) {
      alert("Player 2 venceu!");
      setMenu(true);
    }
    if (event.key === "ArrowUp") {
      alert("Player 2 desistiu!");
      window.history.back();
    }
    if (event.key === "KeyF") {
      alert("Player 1 desistiu!");
      window.history.back();
    }
    if (event.key === "ArrowLeft") {
      player1.life = player1.life - 10;
    }
    if (event.key === "ArrowDown") {
      player2.life = player2.life + 10;
    }
    if (event.key === "ArrowRight") {
      player1.life = player1.life - 20;
    }
  }

  const [players, setPlayers] = React.useState([player1, player2]);

  if (menu) return <MenuBattle />;

  return (
    <div
      tabIndex={0}
      className="flex flex-row items-center justify-center w-full h-screen bg-black"
      onKeyDown={(event) => {
        handleKeyDown(event, player1, player2);
      }}
    >
      <LayoutBattle>
        <BattleField
          attacker={
            <img
              src={defender?.spriteFront || "/Pokeball.webp"}
              alt={defender?.pokeName}
              width={200}
            />
          }
          defender={
            <img
              src={attacker?.spriteBack || "/Pokeball.webp"}
              alt={attacker?.pokeName}
              width={200}
            />
          }
        />
        <ActionBar vida={player1.life} forca={player1.force} />
      </LayoutBattle>
      <div
        className="
      w-2 bg-blue-900 h-full
      "
      ></div>
      <LayoutBattle secondplayer>
        <BattleField
          attacker={
            <img
              src={attacker?.spriteFront || "/Pokeball.webp"}
              alt={attacker?.pokeName}
              width={200}
            />
          }
          defender={
            <img
              src={defender?.spriteBack || "/Pokeball.webp"}
              alt={defender?.pokeName}
              width={200}
            />
          }
        />
        <ActionBar secondplayer vida={player2.life} forca={player2.force} />
      </LayoutBattle>
    </div>
  );
}

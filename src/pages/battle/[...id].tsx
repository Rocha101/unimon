/* eslint-disable @next/next/no-img-element */
import BattleField from "@/components/BattleField";
import ItemsAcoes from "@/components/ItemsAcoes";
import LayoutBattle from "@/components/LayoutBattle";
import Status from "@/components/Status";
import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PokemonClient } from "pokenode-ts";
import { useRouter } from "next/router";
import ActionBar from "@/components/ActionBar";

export default function Battle({}) {
  const router = useRouter();
  const { slug, id } = router.query;

  const [attacker, setAttacker] = useState<{
    pokeName: string;
    spriteFront: string | null;
    spriteBack: string | null;
  }>();
  const [defender, setDefender] = useState<{
    pokeName: string;
    spriteFront: string | null;
    spriteBack: string | null;
  }>();

  const [player1, setPlayer1] = useState({
    name: attacker?.pokeName,
    life: 100,
    force: 100,
    winner: false,
  });

  const [player2, setPlayer2] = useState({
    name: defender?.pokeName,
    life: 100,
    force: 100,
    winner: false,
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!id) return;
      const api = new PokemonClient();

      try {
        const [attackerData, defenderData] = await Promise.all([
          api.getPokemonByName(id[0]),
          api.getPokemonByName(id[1]),
        ]);

        setAttacker({
          pokeName: attackerData.name,
          spriteBack: attackerData.sprites.back_default,
          spriteFront: attackerData.sprites.front_default,
        });

        setDefender({
          pokeName: defenderData.name,
          spriteFront: defenderData.sprites.front_default,
          spriteBack: defenderData.sprites.back_default,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
  }, [id]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const { key } = event;
    const updatedPlayer1 = { ...player1 };
    const updatedPlayer2 = { ...player2 };

    switch (key) {
      case "a":
        if (updatedPlayer1.force <= 0) return;
        if (updatedPlayer2.life <= 0) return;
        updatedPlayer2.life -= 10;
        break;
      case "d":
        if (updatedPlayer2.force <= 0) return;
        if (updatedPlayer1.life <= 0) return;
        updatedPlayer1.life += 10;
        break;
      case "s":
        if (updatedPlayer1.force <= 0) return;
        if (updatedPlayer2.life <= 0) return;
        updatedPlayer2.life -= 20;
        break;
      case "ArrowUp":
        alert("Player 2 desistiu!");
        window.history.back();
        break;
      case "KeyF":
        alert("Player 1 desistiu!");
        window.history.back();
        break;
      case "ArrowLeft":
        if (updatedPlayer2.force <= 0) return;
        if (updatedPlayer1.life <= 0) return;
        updatedPlayer1.life -= 10;
        break;
      case "ArrowDown":
        if (updatedPlayer1.force <= 0) return;
        if (updatedPlayer2.life <= 0) return;
        updatedPlayer2.life += 10;
        break;
      case "ArrowRight":
        if (updatedPlayer2.force <= 0) return;
        if (updatedPlayer1.life <= 0) return;
        updatedPlayer1.life -= 20;
        break;
      default:
        break;
    }

    if (updatedPlayer2.life <= 0) {
      alert("Player 1 venceu!");
      player1.winner = true;
      setMenu(true);
    }
    if (updatedPlayer1.life <= 0) {
      alert("Player 2 venceu!");
      player2.winner = true;
      setMenu(true);
    }

    setPlayer1(updatedPlayer1);
    setPlayer2(updatedPlayer2);
  }
  useEffect(() => {
    if (player1.winner || player2.winner) {
      setMenu(true);
    }
  }, [player1, player2]);

  const handleBack = () => {
    router.back();
  };

  const handleRestart = () => {
    router.reload();
  };

  const [menu, setMenu] = useState(false);
  if (menu)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-center">
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col justify-between gap-4">
          <h1 className="text-3xl text-black">MENU</h1>
          <h2 className="text-xl text-black">
            {player1.winner ? "Player 1" : "Player 2"} venceu a batalha!
          </h2>
          <div className="flex gap-4 justify-between">
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-medium w-full"
              onClick={handleBack}
            >
              Voltar
            </button>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-medium  w-full"
              onClick={handleRestart}
            >
              Recomeçar
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div
      tabIndex={0}
      className="flex flex-row items-center justify-center w-full h-screen bg-black"
      onKeyDown={(event) => {
        handleKeyDown(event);
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

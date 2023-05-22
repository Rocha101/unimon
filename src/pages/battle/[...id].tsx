/* eslint-disable @next/next/no-img-element */
import BattleField from "@/components/BattleField";
import LayoutBattle from "@/components/LayoutBattle";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ActionBar from "@/components/ActionBar";
import { fetchPokemonData } from "@/services/fetchData";

export default function Battle({}) {
  const router = useRouter();
  const { slug, id } = router.query;
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isShaking, setIsShaking] = useState(false); // Shaking state

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

  const [currentTurn, setCurrentTurn] = useState(1);
  const [countdown, setCountdown] = useState(10);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await fetchPokemonData({ id: id, setAttacker, setDefender });
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
    alert("Batalha iniciada! Clique na tela para começar!");
  }, [id]);

  useEffect(() => {
    if (player1.winner || player2.winner) {
      setMenu(true);
    } else {
      setIsCountdownActive(true);
    }
  }, [player1, player2]);

  useEffect(() => {
    if (isCountdownActive) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        setIsCountdownActive(false);
        setCurrentTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));
        setCountdown(3);
      }

      return () => clearInterval(countdownInterval);
    }
  }, [isCountdownActive, countdown]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      isCountdownActive || // Ignore key press if countdown is active
      (currentTurn === 1 && // Player 1 can only press a, d, s, f
        (event.key == "a" ||
          event.key == "d" ||
          event.key == "s" ||
          event.key == "f")) ||
      (currentTurn === 2 && // Player 2 can only press arrow keys
        (event.key == "ArrowLeft" ||
          event.key == "ArrowDown" ||
          event.key == "ArrowRight" ||
          event.key == "ArrowUp"))
    ) {
      return; // Ignore key press if countdown is active or it's not the player's turn
    }

    const { key } = event;
    const updatedPlayer1 = { ...player1 };
    const updatedPlayer2 = { ...player2 };

    switch (key) {
      case "a": // Player 1 attacks
        if (currentTurn === 2) {
          if (updatedPlayer1.force <= 9) return;
          if (updatedPlayer2.life <= 0) return;
          updatedPlayer1.force -= 10;
          updatedPlayer2.life -= 10;
          setIsShaking(true); // Start shaking animation
          setTimeout(() => setIsShaking(false), 500); // Stop shaking animation after 0.5s
        }
        break;
      case "d": // Player 1 heals
        if (currentTurn === 2) {
          if (updatedPlayer1.force == 100) {
            alert("Player 1 já está com a força cheia!");
            return;
          }
          updatedPlayer1.force += 10;
          setIsShaking(true); // Start shaking animation
          setTimeout(() => setIsShaking(false), 500); // Stop shaking animation after 0.5s
        }
        break;
      case "s": // Player 1 super attacks
        if (currentTurn === 2) {
          if (updatedPlayer1.force <= 19) return;
          if (updatedPlayer2.life <= 0) return;
          updatedPlayer1.force -= 20;
          updatedPlayer2.life -= 20;
          setIsShaking(true); // Start shaking animation
          setTimeout(() => setIsShaking(false), 500); // Stop shaking animation after 0.5s
        }
        break;
      case "ArrowLeft": // Player 2 attacks
        if (currentTurn === 1) {
          if (updatedPlayer2.force <= 9) return;
          if (updatedPlayer1.life <= 0) return;
          updatedPlayer2.force -= 10;
          updatedPlayer1.life -= 10;
          setIsShaking(true); // Start shaking animation
          setTimeout(() => setIsShaking(false), 500); // Stop shaking animation after 0.5s
        }
        break;
      case "ArrowDown": // Player 2 heals
        if (currentTurn === 1) {
          if (updatedPlayer2.force == 100) {
            alert("Player 2 já está com a força cheia!");
            return;
          }
          updatedPlayer2.force += 10;
          setIsShaking(true); // Start shaking animation
          setTimeout(() => setIsShaking(false), 500); // Stop shaking animation after 0.5s
        }
        break;
      case "ArrowRight": // Player 2 super attacks
        if (currentTurn === 1) {
          if (updatedPlayer2.force <= 19) return;
          if (updatedPlayer1.life <= 0) return;
          updatedPlayer2.force -= 20;
          updatedPlayer1.life -= 20;
          setIsShaking(true); // Start shaking animation
          setTimeout(() => setIsShaking(false), 500); // Stop shaking animation after 0.5s
        }
        break;
      case "ArrowUp": // Player 2 gives up
        if (currentTurn === 1) {
          alert("Player 2 desistiu!");
          updatedPlayer1.winner = true;
          setMenu(true);
        }
        break;
      case "f": // Player 1 gives up
        if (currentTurn === 2) {
          alert("Player 1 desistiu!");
          updatedPlayer2.winner = true;
          setMenu(true);
        }
        break;
      default:
        break;
    }

    if (updatedPlayer2.life <= 0 && updatedPlayer1.life <= 0) {
      // Both players' life points are <= 0
      alert("Empate!");
      updatedPlayer1.winner = true;
      updatedPlayer2.winner = true;
      setMenu(true);
    } else if (updatedPlayer2.life <= 0) {
      // Player 1 wins
      alert("Player 1 venceu!");
      updatedPlayer1.winner = true;
      setMenu(true);
    } else if (updatedPlayer1.life <= 0) {
      // Player 2 wins
      alert("Player 2 venceu!");
      updatedPlayer2.winner = true;
      setMenu(true);
    }

    setPlayer1(updatedPlayer1);
    setPlayer2(updatedPlayer2);
  }

  const handleBack = () => {
    router.back();
  };

  const handleRestart = () => {
    router.reload();
  };

  const [menu, setMenu] = useState(false);
  if (menu)
    return (
      <div
        className={`flex flex-row items-center justify-center w-full h-screen bg-black`}
      >
        <div className="bg-gray-300 p-4 rounded-lg flex flex-col justify-between gap-4">
          <h1 className="text-3xl text-black">MENU</h1>
          <h2 className="text-xl text-black">
            {player1.winner ? "Player 1" : "Player 2"} venceu a batalha!
          </h2>
          <div className="flex gap-4 justify-between">
            <button
              className="bg-slate-700 px-4 py-2 rounded-lg text-white font-medium w-full"
              onClick={handleBack}
            >
              Voltar
            </button>
            <button
              className="bg-slate-700 px-4 py-2 rounded-lg text-white font-medium  w-full"
              onClick={handleRestart}
            >
              Recomeçar
            </button>
          </div>
        </div>
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-center">
        <h1 className="text-3xl text-white">Carregando...</h1>
      </div>
    );
  }
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
      <div className="w-96 bg-slate-700 h-full text-center font-bold select-none">
        {isCountdownActive ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl text-white">{countdown}</h1>
            <h2 className="text-xl text-white">Turno {currentTurn}</h2>
            <h2 className="text-white">
              (Jogador {currentTurn === 1 ? "1" : "2"})
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl text-white">
              Vez do Jogador {currentTurn === 1 ? "2" : "1"}
            </h1>
          </div>
        )}
      </div>

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

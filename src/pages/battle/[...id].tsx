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
        <button
          disabled
          type="button"
          className="py-2.5 px-5 mr-2 text-xl font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Carregando
        </button>
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
        <ActionBar
          vida={player1.life}
          forca={player1.force}
          pokemon={attacker?.pokeName || "Pokeball"}
        />
      </LayoutBattle>
      <div className="w-96 bg-gray-900 h-full text-center font-bold select-none">
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
        <ActionBar
          secondplayer
          vida={player2.life}
          forca={player2.force}
          pokemon={defender?.pokeName || "Pokeball"}
        />
      </LayoutBattle>
    </div>
  );
}

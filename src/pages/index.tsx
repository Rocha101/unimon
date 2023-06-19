import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";

export default function Listagem({}) {
  const Link =
    "text-gray-300 hover:text-gray-900 text-md bg-slate-800 hover:bg-gray-200 rounded-lg px-2 py-1 my-1 active:bg-gray-300 w-full";

  const [isLoading, setIsLoading] = useState(true);

  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<{
    attacker: string;
    defender: string;
  }>({ attacker: "", defender: "" });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      const api = new PokemonClient();
      try {
        const data = await api.listPokemons(0, 10000);
        setPokemons(data.results);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchPokemons();
  }, []);

  const handleSelectPokemon = (pokemon: string) => {
    if (!selectedPokemon?.attacker) {
      setSelectedPokemon({ attacker: pokemon, defender: "" });
    } else if (!selectedPokemon?.defender) {
      setSelectedPokemon({ ...selectedPokemon, defender: pokemon });
    } else {
      if (window.confirm("Deseja selecionar esse pokemon?")) {
        setSelectedPokemon({ attacker: pokemon, defender: "" });
      }
    }
  };

  const filteredPokemons = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSubmit = (attacker: any, defender: any) => {
    console.log("Clicou");
    if (!attacker || !defender) {
      alert("Selecione um pokemon atacante e um pokemon defensor");
    } else {
      window.location.href = `/battle/${attacker}/${defender}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black opacity-50 text-center">
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
    <Layout>
      <div className="flex flex-row gap-2 w-2/5 h-2/5">
        <div className="text-white bg-slate-700 p-4 rounded-lg w-full h-full flex flex-col gap-2">
          <form className="flex flex-col gap-2">
            <input
              type="text"
              className="rounded-lg px-2 py-1 text-black"
              placeholder="Busque um Unimon"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
          <div className="overflow-y-scroll w-full h-96">
            {filteredPokemons.length === 0 ? (
              <p className="text-gray-300">Nenhum Unimon Encontrado!</p>
            ) : (
              filteredPokemons.map((pokemon) => (
                <div key={pokemon.name}>
                  <button
                    className={Link}
                    onClick={() => handleSelectPokemon(pokemon.name)}
                  >
                    {pokemon.name}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="text-white bg-slate-700 p-4 rounded-lg w-2/5">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-xl">Selecionado</h1>
            <h2 className="text-md w-full">
              ⚔️ Atacante:{" "}
              <span className="text-gray-100">
                {selectedPokemon?.attacker.toUpperCase() || "Nenhum"}
              </span>
            </h2>
            <h2 className="text-md">
              🛡️ Defensor:{" "}
              <span className="text-gray-100">
                {selectedPokemon?.defender.toUpperCase() || "Nenhum"}
              </span>
            </h2>
            <button
              className={Link}
              onClick={() =>
                handleSubmit(
                  selectedPokemon?.attacker,
                  selectedPokemon?.defender
                )
              }
              disabled={
                !selectedPokemon?.attacker || !selectedPokemon?.defender
              }
            >
              Iniciar Batalha
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

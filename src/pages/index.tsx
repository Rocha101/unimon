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
      <div className="flex flex-col items-center justify-center h-screen bg-black text-center">
        <h1 className="text-3xl text-white">Carregando...</h1>
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

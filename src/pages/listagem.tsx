import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";

export default function Listagem({}) {
  const Link =
    "text-gray-300 hover:text-gray-900 text-3xl bg-slate-800 hover:bg-gray-200 rounded-lg px-2 py-1 my-2 active:bg-gray-300 w-full";

  function handleSubmit(attacker: any, defender: any) {
    console.log("Clicou");
    window.location.href = `/battle/${attacker}/${defender}`;
  }

  const [pokemons, setPokemons] = React.useState<NamedAPIResource[]>();

  (async () => {
    const api = new PokemonClient();

    await api
      .listPokemons(
        0, // offset
        15 // limit
      )
      .then((data) => setPokemons(data.results))
      .catch((error) => console.error(error));
  })();

  const [selectedPokemon, setSelectedPokemon] = React.useState<{
    attacker: string;
    defender: string;
  }>();

  function handleSelectPokemon(pokemon: string) {
    if (!selectedPokemon?.attacker) {
      return setSelectedPokemon({ attacker: pokemon, defender: "" });
    } else if (!selectedPokemon?.defender) {
      return setSelectedPokemon({ ...selectedPokemon, defender: pokemon });
    }

    confirm("Deseja selecionar esse pokemon?") &&
      setSelectedPokemon({ attacker: pokemon, defender: "" });
  }

  return (
    <Layout>
      <div className="flex flex-row gap-2">
        <div className="text-white bg-slate-700 p-4 rounded-lg">
          <h1 className="text-5xl">Listagem</h1>
          <div className="grid grid-cols-3 gap-2">
            {pokemons?.map((pokemon) => (
              <div key={pokemon.name}>
                <button
                  className={Link}
                  onClick={() => handleSelectPokemon(pokemon.name)}
                >
                  {pokemon.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-white bg-slate-700 p-4 rounded-lg">
          <h1 className="text-5xl">Selecionado</h1>
          <div>
            <h2 className="text-3xl">Atacante: {selectedPokemon?.attacker}</h2>
            <h2 className="text-3xl">Defensor: {selectedPokemon?.defender}</h2>
            <button
              className={Link}
              onClick={() =>
                handleSubmit(
                  selectedPokemon?.attacker,
                  selectedPokemon?.defender
                )
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

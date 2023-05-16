import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";

export default function Listagem({}) {
  const Link =
    "text-gray-300 hover:text-gray-900 text-md bg-slate-800 hover:bg-gray-200 rounded-lg px-2 py-1 my-2 active:bg-gray-300 w-full";

  function handleSubmit(attacker: any, defender: any) {
    console.log("Clicou");
    if (!attacker || !defender)
      return alert("Selecione um pokemon atacante e um pokemon defensor");
    window.location.href = `/battle/${attacker}/${defender}`;
  }

  const [pokemons, setPokemons] = React.useState<NamedAPIResource[]>();

  (async () => {
    const api = new PokemonClient();

    await api
      .listPokemons(0, 10000)
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

  const [searchInput, setSearchInput] = React.useState("");
  const filteredPokemons = pokemons?.filter((poke) =>
    poke.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-row gap-2 w-2/5 h-2/5">
        <div className="text-white bg-slate-700 p-4 rounded-lg w-full h-full flex flex-col gap-2">
          <h1 className="text-xl">Listagem</h1>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              className="rounded-lg px-2 py-1 text-black"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
          <div className=" overflow-y-scroll w-full h-96">
            {filteredPokemons?.map((pokemon) => (
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
        <div className="text-white bg-slate-700 p-4 rounded-lg w-2/5">
          <h1 className="text-xl">Selecionado</h1>
          <div>
            <h2 className="text-md">
              Atacante: {selectedPokemon?.attacker.toUpperCase()}
            </h2>
            <h2 className="text-md">
              Defensor: {selectedPokemon?.defender.toUpperCase()}
            </h2>
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

import { PokemonClient } from "pokenode-ts";

export const fetchPokemonData = async ({
  id,
  setAttacker,
  setDefender,
}: {
  id: string[] | string | undefined;
  setAttacker: React.Dispatch<
    React.SetStateAction<
      | {
          pokeName: string;
          spriteFront: string | null;
          spriteBack: string | null;
        }
      | undefined
    >
  >;
  setDefender: React.Dispatch<
    React.SetStateAction<
      | {
          pokeName: string;
          spriteFront: string | null;
          spriteBack: string | null;
        }
      | undefined
    >
  >;
}) => {
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

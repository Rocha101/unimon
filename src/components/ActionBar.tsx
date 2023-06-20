import React from "react";
import ItemsAcoes from "./ItemsAcoes";
import Status from "./Status";

interface ActionBarProps {
  secondplayer?: boolean;
  vida: number;
  forca: number;
  pokemon: string;
}

const ActionBar: React.FC<ActionBarProps> = ({
  secondplayer,
  vida,
  forca,
  pokemon,
}) => {
  return (
    <div className="bg-gray-900 h-2/5 w-full p-4 flex flex-row gap-4 border-t-4 border-gray-800 text-gray-300">
      <div className="w-2/5 flex flex-col gap-1">
        <div className="flex gap-2">
          <h3 className="py-1  px-2 bg-gray-900 border font-bold flex items-center justify-center rounded-lg w-24">
            {secondplayer ? "Jogador 2" : "Jogador 1"}
          </h3>
          <h3 className="py-1 px-2 bg-gray-900 border font-bold flex items-center justify-center rounded-lg w-24">
            {pokemon?.toUpperCase() || "Nenhum"}
          </h3>
        </div>
        <h2 className="text-md">Ações</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800 font-bold">
          <ItemsAcoes icon="👊">
            {secondplayer ? "Tecla ⬅️" : "Tecla A"}
          </ItemsAcoes>
          <ItemsAcoes icon="🛡️">
            {secondplayer ? "Tecla ⬇️" : "Tecla D"}
          </ItemsAcoes>
          <ItemsAcoes icon="🔥">
            {secondplayer ? "Tecla ➡️" : "Tecla S"}
          </ItemsAcoes>
          <ItemsAcoes icon="🏃">
            {secondplayer ? "Tecla ⬆️" : "Tecla F"}
          </ItemsAcoes>
        </ul>
      </div>
      <div className="w-3/5">
        <Status label="Vida" color="bg-red-500" pct={vida} />
        <Status label="Força" color="bg-blue-500" pct={forca} />
      </div>
    </div>
  );
};

export default ActionBar;

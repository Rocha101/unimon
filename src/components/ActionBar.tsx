import React from "react";
import ItemsAcoes from "./ItemsAcoes";
import Status from "./Status";

interface ActionBarProps {
  secondplayer?: boolean;
  vida: number;
  forca: number;
}

const ActionBar: React.FC<ActionBarProps> = ({
  secondplayer = false,
  vida,
  forca,
}) => {
  return (
    <div className="bg-slate-700 h-2/5 w-full p-4 flex flex-row gap-4 border-t-4 border-gray-800 text-gray-300">
      <div className="w-2/5 flex flex-col gap-1">
        <h2 className="text-md">Ações</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800 font-bold">
          <ItemsAcoes icon="👊" tecla={secondplayer ? "ArrowLeft" : "a"}>
            {secondplayer ? "Tecla ⬅️" : "Tecla A"}
          </ItemsAcoes>
          <ItemsAcoes icon="🛡️" tecla={secondplayer ? "ArrowDown" : "d"}>
            {secondplayer ? "Tecla ⬇️" : "Tecla D"}
          </ItemsAcoes>
          <ItemsAcoes icon="🔥" tecla={secondplayer ? "ArrowRight" : "s"}>
            {secondplayer ? "Tecla ➡️" : "Tecla S"}
          </ItemsAcoes>
          <ItemsAcoes icon="🏃" tecla={secondplayer ? "ArrowUp" : "f"}>
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

import React from "react";
import ItemsAcoes from "./ItemsAcoes";
import Status from "./Status";

type Props = {};

export default function ActionBar({
  secondplayer,
  vida,
  forca,
}: {
  secondplayer?: boolean;
  vida: number;
  forca: number;
}) {
  return (
    <div className="bg-gray-300 h-2/5 w-full p-4 flex flex-row gap-4 border-t-4 border-gray-800">
      <div className="w-2/5 flex flex-col gap-4">
        <h2 className="text-md">Ações</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ItemsAcoes icon="👊" key={secondplayer ? "SetaEsquerda" : "KeyA"}>
            {secondplayer ? "⬅️" : "Tecla A"}
          </ItemsAcoes>
          <ItemsAcoes icon="🛡️" key="d">
            {secondplayer ? "⬇️" : "Tecla D"}
          </ItemsAcoes>
          <ItemsAcoes icon="🔥" key="s">
            {secondplayer ? "➡️" : "Tecla S"}
          </ItemsAcoes>
          <ItemsAcoes icon="🏃" key="f">
            {secondplayer ? "⬆️" : "Tecla F"}
          </ItemsAcoes>
        </ul>
      </div>
      <div className="w-3/5">
        <Status label="Vida" color="bg-red-500" pct={vida} />
        <Status label="Força" color="bg-blue-500" pct={forca} />
      </div>
    </div>
  );
}

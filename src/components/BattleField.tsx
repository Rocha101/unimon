import React from "react";

type Props = {
  attacker: React.ReactNode;
  defender: React.ReactNode;
};

export default function BattleField({ attacker, defender }: Props) {
  return (
    <>
      <div className="w-full px-6 flex justify-end">{attacker}</div>
      <div className="w-full px-6">{defender}</div>
    </>
  );
}

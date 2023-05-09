import React from "react";

type Props = {};

export default function Status({
  label,
  color,
  pct,
}: {
  label: string;
  color: string;
  pct: number;
}) {
  return (
    <div>
      <h2 className="text-3xl">{label}</h2>
      <div
        className={`bg-gray-200 h-8 w-full rounded-lg border-2 border-gray-500`}
      >
        <div
          className={`${color} h-full rounded-l-md`}
          style={{ width: `${pct}%` } as React.CSSProperties}
        ></div>
      </div>
      <div>
        <span className="text-2xl">{pct}/100</span>
      </div>
    </div>
  );
}

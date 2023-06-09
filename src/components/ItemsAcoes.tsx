import React from "react";

export default function ItemsAcoes({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      className={`text-md px-2 py-1 bg-gray-400 cursor-default rounded-lg flex flex-row gap-3`}
    >
      {icon}
      <span className="truncate flex justify-between items-center gap-6">
        {children}
      </span>
    </button>
  );
}

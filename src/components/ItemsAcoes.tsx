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
      className={`text-md px-2 py-1 bg-blue-900 text-white cursor-default rounded-lg flex flex-row gap-3 justify-center items-center`}
    >
      {icon}
      <span className="truncate flex justify-between items-center gap-6">
        {children}
      </span>
    </button>
  );
}

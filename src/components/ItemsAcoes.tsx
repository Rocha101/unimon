export default function ItemsAcoes({
  children,
  icon,
  key,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  key: string;
}) {
  return (
    <button className="text-xl px-2 py-1 bg-gray-400 hover:bg-gray-500 rounded-lg flex flex-row gap-3">
      {icon}
      <span className="truncate flex justify-between items-center w-full gap-6">
        {children}
      </span>
    </button>
  );
}

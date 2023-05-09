export default function ItemsAcoes({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <li className="text-xl px-2 py-1 bg-gray-400 hover:bg-gray-500 rounded-lg flex flex-row gap-3">
      {icon}
      <span className="truncate">{children}</span>
    </li>
  );
}

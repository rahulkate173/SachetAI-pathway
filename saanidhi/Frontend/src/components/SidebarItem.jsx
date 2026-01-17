export default function SidebarItem({ icon: Icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md w-full
      ${active ? "bg-orange-500" : "hover:bg-slate-800"}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

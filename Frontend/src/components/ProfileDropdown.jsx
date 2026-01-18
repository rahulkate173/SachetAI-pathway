import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
          NO
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm font-semibold">
            NDRF Operator
            <ChevronDown size={14} />
          </div>
          <span className="inline-block mt-1 px-2 py-[2px] text-xs bg-green-600/20 text-green-400 rounded">
            Maharashtra Region
          </span>
        </div>
      </div>

      {open && (
        <div className="absolute mt-2 w-full bg-slate-800 rounded shadow-lg z-50">
          {["NDRF Operator", "Civilian", "Volunteer"].map(role => (
            <div
              key={role}
              className="px-3 py-2 text-sm hover:bg-slate-700 cursor-pointer"
            >
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

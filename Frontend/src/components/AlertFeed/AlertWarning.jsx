import { AlertCircle, MapPin, Clock } from "lucide-react";

export default function AlertWarning({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-orange-200 bg-orange-50 p-4 flex flex-col gap-2
                 cursor-pointer transition hover:shadow-md hover:scale-[1.01]"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-600 font-semibold">
          <AlertCircle size={16} />
          Landslide Warning
        </div>
        <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">
          WARNING
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <MapPin size={14} />
        Mahabaleshwar Ghat
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 leading-relaxed">
        Unstable terrain detected. Alternative routes advised via SH-78.
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>District Control Room</span>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          12 mins ago
        </div>
      </div>
    </div>
  );
}

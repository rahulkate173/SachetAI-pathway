import { AlertTriangle, MapPin, Clock } from "lucide-react";

export default function AlertCritical({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-red-200 bg-red-50 p-4 flex flex-col gap-2
                 cursor-pointer transition hover:shadow-md hover:scale-[1.01]"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-600 font-semibold">
          <AlertTriangle size={16} />
          Flash Flood Alert
        </div>
        <span className="text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
          CRITICAL
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <MapPin size={14} />
        Solapur District
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 leading-relaxed">
        Rapid water level rise detected. Immediate evacuation recommended for
        low-lying areas.
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>NDRF</span>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          5 mins ago
        </div>
      </div>
    </div>
  );
}

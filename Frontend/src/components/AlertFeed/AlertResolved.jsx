import { CheckCircle, MapPin, Clock } from "lucide-react";

export default function AlertResolved({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-green-200 bg-green-50 p-4 flex flex-col gap-2
                 cursor-pointer transition hover:shadow-md hover:scale-[1.01]"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <CheckCircle size={16} />
          Rescue Completed
        </div>
        <span className="text-xs font-semibold bg-green-600 text-white px-2 py-0.5 rounded-full">
          RESOLVED
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <MapPin size={14} />
        Akkalkot, Maharashtra
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 leading-relaxed">
        All affected civilians safely evacuated. Medical aid and relief
        distributed.
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>NDRF Rescue Unit</span>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          25 mins ago
        </div>
      </div>
    </div>
  );
}

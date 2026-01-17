import { useEffect, useState } from "react";
import MaharashtraMap from "./MaharashtraMap.jsx";
import AlertCritical from "./AlertCritical.jsx";
import AlertWarning from "./AlertWarning.jsx";
import AlertResolved from "./AlertResolved.jsx";

export default function AlertFeed({ onClose }) {
  const [activeSpot, setActiveSpot] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  /* Fake Live Refresh  */
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 800);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-white p-4 flex flex-col gap-4 border-l border-slate-200">

      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Live Alert Feed
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span
              className={`h-2 w-2 rounded-full ${
                refreshing ? "bg-green-500 animate-pulse" : "bg-green-500"
              }`}
            />
            Real-time grounding data
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xl leading-none"
          aria-label="Close Live Alert Feed"
        >
          ×
        </button>
      </div>

      {/* Maharashtra Map */}
      <div className="rounded-xl overflow-hidden">
        <MaharashtraMap activeSpot={activeSpot} />
      </div>

      {/* Alert Cards */}
      <div className="grid grid-rows-3 gap-4 flex-1">
        <AlertCritical onClick={() => setActiveSpot("solapur")} />
        <AlertWarning onClick={() => setActiveSpot("mahabaleshwar")} />
        <AlertResolved onClick={() => setActiveSpot("akkalkot")} />
      </div>
    </div>
  );
}

export default function QuickActions() {
  return (
    <div className="mt-auto pt-4">
      <p className="text-xs uppercase opacity-60 mb-2">Quick Actions</p>
      <button className="w-full mb-2 py-2 rounded bg-orange-500 text-white">
        Report New Incident
      </button>
      <button className="w-full py-2 rounded border border-slate-600">
        Download Situation Report
      </button>
    </div>
  );
}

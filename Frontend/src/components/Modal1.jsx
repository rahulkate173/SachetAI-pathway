import { X } from "lucide-react";

export default function Modal1({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Modal Card */}
      <div
        className="
          bg-white rounded-xl
          w-[520px] max-w-[92%]
          shadow-2xl
          animate-scaleIn
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="
              p-1.5 rounded-md
              text-slate-600
              hover:bg-orange-100
              hover:text-orange-600
              transition
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

       
        <div className="h-1 bg-orange-500" />

        {/* Content */}
        <div
          className="
            px-5 py-4
            text-sm text-slate-700
            space-y-4
            max-h-[60vh]
            overflow-y-auto
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

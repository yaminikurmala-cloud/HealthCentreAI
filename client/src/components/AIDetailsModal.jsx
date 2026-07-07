import { X } from "lucide-react";

function AIDetailsModal({ open, onClose, alert }) {
  if (!open || !alert) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[550px] p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            AI Decision Analysis
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4">

          <div>
            <h3 className="text-lg font-semibold">
              {alert.title}
            </h3>

            <p className="text-slate-600 mt-2">
              {alert.message}
            </p>
          </div>

          <div className="bg-teal-50 rounded-xl p-4">

            <h4 className="font-semibold text-teal-700 mb-3">
              AI Recommendation
            </h4>

            <p>
              {alert.recommendation}
            </p>

          </div>

          <div className="bg-slate-50 rounded-xl p-4">

            <h4 className="font-semibold mb-2">
              AI Reasoning
            </h4>

            <ul className="space-y-2 text-sm">

              <li>• Medicine stock has dropped below threshold.</li>

              <li>• Daily consumption indicates depletion within 48 hours.</li>

              <li>• Nearby PHC has sufficient surplus stock.</li>

              <li>• AI recommends redistribution to avoid shortages.</li>

            </ul>

          </div>

          <div className="flex justify-between items-center border-t pt-4">

            <span className="text-slate-500">
              Confidence
            </span>

            <span className="text-xl font-bold text-teal-700">
              {alert.confidence}%
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AIDetailsModal;
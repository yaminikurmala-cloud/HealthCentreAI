import { X, Brain, Activity, Pill, MapPin, Clock } from "lucide-react";

function AIDetailsModal({ open, onClose, alert }) {
  if (!open || !alert) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[650px] rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6">

          <div className="flex items-center gap-3">

            <Brain className="text-teal-700" />

            <div>
              <h2 className="text-xl font-bold">
                AI Decision Analysis
              </h2>

              <p className="text-sm text-slate-500">
                Explainable AI Recommendation
              </p>
            </div>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          <div className="bg-red-50 rounded-xl p-4">

            <h3 className="font-semibold text-red-700">
              {alert.title}
            </h3>

            <p className="text-sm mt-2">
              {alert.message}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="border rounded-xl p-4">
              <Pill className="text-teal-700 mb-2" />

              <h4 className="font-semibold">
                Current Stock
              </h4>

              <p className="text-2xl font-bold">
                15 Units
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <Activity className="text-teal-700 mb-2" />

              <h4 className="font-semibold">
                Daily Usage
              </h4>

              <p className="text-2xl font-bold">
                42 Units
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <Clock className="text-teal-700 mb-2" />

              <h4 className="font-semibold">
                Predicted Stock-out
              </h4>

              <p className="text-2xl font-bold text-red-600">
                2 Days
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <MapPin className="text-teal-700 mb-2" />

              <h4 className="font-semibold">
                Suggested Source
              </h4>

              <p className="text-lg font-bold">
                PHC Tadepalli
              </p>
            </div>

          </div>

          <div className="bg-teal-50 rounded-xl p-5">

            <h3 className="font-semibold text-teal-700 mb-3">
              AI Reasoning
            </h3>

            <ul className="space-y-2 text-sm">

              <li>• Medicine stock is below minimum threshold.</li>

              <li>• Average daily consumption is 42 units.</li>

              <li>• AI predicts stock depletion within 48 hours.</li>

              <li>• Nearby PHC has surplus inventory.</li>

              <li>• Estimated transfer time: 25 minutes.</li>

            </ul>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-sm font-medium text-slate-500">
              Confidence Score
            </span>

            <span className="text-xl font-bold text-teal-700">
              96%
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIDetailsModal;
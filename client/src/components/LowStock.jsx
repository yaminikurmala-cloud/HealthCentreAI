import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Clock3,
  Package,
  Building2,
  CheckCircle2,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { getStockPredictions } from "../services/stockPredictionService";

function LowStock() {
  const { t } = useLanguage();

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    loadPredictions();
  }, []);

  async function loadPredictions() {
    const data = await getStockPredictions();

    setPredictions(data.slice(0, 5));
  }

  function getStatusColor(status) {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-700";

      case "warning":
        return "bg-yellow-100 text-yellow-700";

      case "low":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-green-100 text-green-700";
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "critical":
        return t.critical;

      case "warning":
        return t.warning;

      case "low":
        return t.low;

      default:
        return t.healthy;
    }
  }

  function recommendationText(item) {
    switch (item.type) {
      case "transfer":
        return `${t.transfer} ${item.units} ${t.unitsFrom} ${item.from}`;

      case "order":
        return `${t.order} ${item.units} ${t.additionalUnits}`;

      case "notify":
        return t.notifyDistrictStore;

      default:
        return t.stockHealthy;
    }
  }
 return (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

    {/* Header */}

    <div className="flex items-center justify-between px-6 py-5 border-b">

      <div>

        <h2 className="text-2xl font-bold">
          🤖 {t.aiStockPrediction}
        </h2>

        <p className="text-gray-500 mt-1">
          AI predicts medicines likely to stock out soon
        </p>

      </div>

      <AlertTriangle
        className="text-red-500"
        size={30}
      />

    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Medicine
            </th>

            <th className="px-6 py-4 text-left">
              PHC
            </th>

            <th className="px-6 py-4 text-center">
              Stock
            </th>

            <th className="px-6 py-4 text-center">
              Daily Use
            </th>

            <th className="px-6 py-4 text-center">
              Days Left
            </th>

            <th className="px-6 py-4 text-center">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              AI Recommendation
            </th>

          </tr>

        </thead>

        <tbody>

          {predictions.map((medicine) => (

            <tr
              key={medicine.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-5 font-semibold">

                💊 {medicine.name}

              </td>

              <td className="px-6 py-5">

                {medicine.phcName}

              </td>

              <td className="px-6 py-5 text-center font-bold">

                {medicine.stock}

              </td>

              <td className="px-6 py-5 text-center">

                {medicine.averageDailyConsumption}/day

              </td>

              <td className="px-6 py-5 text-center font-bold">

                {medicine.daysLeft}

              </td>

              <td className="px-6 py-5 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    medicine.status
                  )}`}
                >
                  {getStatusText(medicine.status)}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="space-y-2">

                  {medicine.recommendations.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-2"
                      >

                        <CheckCircle2
                          className="text-green-600 mt-1"
                          size={16}
                        />

                        <span className="text-sm">

                          {recommendationText(item)}

                        </span>

                      </div>

                    )
                  )}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
};
 

export default LowStock;
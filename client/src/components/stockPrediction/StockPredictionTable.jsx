import {
  AlertTriangle,
  CheckCircle2,
  Package,
  CalendarClock,
  Building2,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
function StockPredictionTable({
  predictions,
  loading,
}) {
  const { t } = useLanguage();

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

  function getStatus(status) {
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              {t.medicine}
            </th>

            <th className="px-6 py-4 text-left">
              {t.phc}
            </th>

            <th className="px-6 py-4 text-center">
              {t.stock}
            </th>

            <th className="px-6 py-4 text-center">
              {t.dailyUsage}
            </th>

            <th className="px-6 py-4 text-center">
              {t.daysLeft}
            </th>

            <th className="px-6 py-4 text-center">
              {t.status}
            </th>

            <th className="px-6 py-4">
              {t.aiRecommendation}
            </th>

          </tr>

        </thead>

        <tbody>

          {predictions.map((medicine) => (

            <tr
              key={medicine.id}
              className="border-t hover:bg-slate-50"
            >

              {/* Medicine */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">

                    <Package
                      className="text-teal-700"
                      size={18}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {medicine.name}
                    </h3>

                  </div>

                </div>

              </td>

              {/* PHC */}

              <td>

                <div className="flex items-center gap-2">

                  <Building2
                    size={16}
                    className="text-gray-500"
                  />

                  {medicine.phcName}

                </div>

              </td>

              {/* Stock */}

              <td className="text-center font-bold">
                {medicine.stock}
              </td>

              {/* Daily */}

              <td className="text-center">
                {medicine.averageDailyConsumption}/day
              </td>

              {/* Days */}

              <td>

                <div className="flex justify-center items-center gap-2">

                  <CalendarClock
                    size={16}
                    className="text-red-500"
                  />

                  {medicine.daysLeft}

                </div>

              </td>

              {/* Status */}

              <td className="text-center">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    medicine.status
                  )}`}
                >
                  {getStatus(medicine.status)}
                </span>

              </td>

              {/* AI */}

              <td className="py-5">

                <div className="space-y-2">

                  {medicine.recommendations.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex gap-2"
                      >

                        {medicine.status ===
                        "critical" ? (

                          <AlertTriangle
                            size={16}
                            className="text-red-500 mt-1"
                          />

                        ) : (

                          <CheckCircle2
                            size={16}
                            className="text-green-600 mt-1"
                          />

                        )}

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
  );
}

export default StockPredictionTable;
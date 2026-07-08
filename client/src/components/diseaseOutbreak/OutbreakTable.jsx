import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function OutbreakTable({ outbreaks, loading }) {
  const { t } = useLanguage();

  function getRiskColor(risk) {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  }

  function getRiskText(risk) {
    switch (risk) {
      case "High":
        return t.high;

      case "Medium":
        return t.medium;

      default:
        return t.low;
    }
  }

  function getIcon(risk) {
    switch (risk) {
      case "High":
        return (
          <ShieldAlert
            size={18}
            className="text-red-600"
          />
        );

      case "Medium":
        return (
          <AlertTriangle
            size={18}
            className="text-yellow-600"
          />
        );

      default:
        return (
          <CheckCircle2
            size={18}
            className="text-green-600"
          />
        );
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-6 py-4">
              {t.phc}
            </th>

            <th className="text-left px-6 py-4">
              {t.disease}
            </th>

            <th className="text-center px-6 py-4">
              {t.currentCases}
            </th>

            <th className="text-center px-6 py-4">
              {t.normalAverage}
            </th>

            <th className="text-center px-6 py-4">
              {t.risk}
            </th>

            <th className="text-center px-6 py-4">
              {t.confidence}
            </th>

            <th className="px-6 py-4">
              {t.aiRecommendation}
            </th>

          </tr>

        </thead>

        <tbody>

          {outbreaks.map((item) => (

            <tr
              key={`${item.phcName}-${item.disease}`}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-5 font-semibold">
                {item.phcName}
              </td>

              <td className="px-6">
                {item.disease}
              </td>

              <td className="text-center font-semibold">
                {item.currentCases}
              </td>

              <td className="text-center">
                {item.normalAverage}
              </td>

              <td className="text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                    item.risk
                  )}`}
                >
                  {getRiskText(item.risk)}
                </span>

              </td>

              <td className="text-center font-semibold">
                {item.confidence}%
              </td>

              <td className="px-6 py-4">

                <div
                  className={`rounded-xl border p-3 ${
                    item.risk === "High"
                      ? "border-red-200 bg-red-50"
                      : item.risk === "Medium"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-green-200 bg-green-50"
                  }`}
                >

                  <div className="flex gap-3">

                    {getIcon(item.risk)}

                    <div>

                      <h4 className="font-semibold text-slate-800">
                        {item.recommendation}
                      </h4>

                      <p className="text-xs text-slate-600 mt-1 leading-5">
                        {item.explanation}
                      </p>

                    </div>

                  </div>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OutbreakTable;
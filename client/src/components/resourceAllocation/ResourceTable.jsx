import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import ApplyRecommendationButton from "../recommendation/ApplyRecommendationButton";

function ResourceTable({
  resources,
  loading,
}) {
  const { t } = useLanguage();

  function getPriorityText(priority) {
    switch (priority) {
      case "Critical":
        return t.critical;
      case "Medium":
        return t.medium;
      default:
        return t.low;
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  }

  function getReason(rec) {
    const values = rec.values || {};

    switch (rec.reasonKey) {
      case "doctorReason":
        return `${values.patients ?? 0} patients are currently managed by ${
          values.doctors ?? 0
        } doctor(s). AI recommends deploying ${
          values.required ?? 0
        } additional doctor(s).`;

      case "bedReason":
        return `Only ${values.available ?? 0} beds are available out of ${
          values.total ?? 0
        } total beds.`;

      case "medicineReason":
        return `${values.shortage ?? 0} medicine(s) are currently in shortage or critical status.`;

      case "testReason":
        return `Only ${values.available ?? 0} diagnostic tests are currently available.`;

      default:
        return "All healthcare resources are operating normally.";
    }
  }

  function getIcon(priority) {
    if (priority === "Critical") {
      return (
        <ShieldAlert
          size={18}
          className="text-red-600 mt-1 flex-shrink-0"
        />
      );
    }

    if (priority === "Medium") {
      return (
        <AlertTriangle
          size={18}
          className="text-yellow-600 mt-1 flex-shrink-0"
        />
      );
    }

    return (
      <CheckCircle2
        size={18}
        className="text-green-600 mt-1 flex-shrink-0"
      />
    );
  }

  function getCardColor(priority) {
    switch (priority) {
      case "Critical":
        return "border-red-200 bg-red-50";

      case "Medium":
        return "border-yellow-200 bg-yellow-50";

      default:
        return "border-green-200 bg-green-50";
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-6 py-4">
              {t.phc}
            </th>

            <th className="text-center px-6 py-4">
              {t.healthScore}
            </th>

            <th className="text-center px-6 py-4">
              {t.priority}
            </th>

            <th className="text-center px-6 py-4">
              {t.doctorsRequired}
            </th>

            <th className="text-center px-6 py-4">
              {t.availableBeds}
            </th>

            <th className="px-6 py-4">
              {t.aiRecommendation}
            </th>
          </tr>
        </thead>

        <tbody>
          {resources.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-5 font-semibold align-middle">
                {item.phcName}
              </td>

              <td className="text-center font-bold align-middle">
                {item.healthScore}
              </td>

              <td className="text-center align-middle">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    item.priority
                  )}`}
                >
                  {getPriorityText(item.priority)}
                </span>
              </td>

              <td className="text-center font-semibold align-middle">
                {item.requiredDoctors}
              </td>

              <td className="text-center font-semibold align-middle">
                {item.availableBeds}
              </td>

              <td className="px-6 py-4">
                <div className="space-y-3">
                  {item.recommendations.map((rec, index) => {
                    console.log(item.phcName, rec);

                    return (
                      <div
                        key={index}
                        className={`rounded-xl border p-3 ${getCardColor(
                          item.priority
                        )}`}
                      >
                        <div className="flex gap-3">
                          {getIcon(item.priority)}

                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800">
                              {t[rec.key]}
                            </h4>

                            <p className="text-xs text-slate-600 mt-1 leading-5">
                              {getReason(rec)}
                            </p>

                            <ApplyRecommendationButton
                              phcName={item.phcName}
                              recommendation={rec}
                              onApplied={() =>
                                window.location.reload()
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResourceTable;
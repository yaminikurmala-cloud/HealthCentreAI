import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getTopRecommendations } from "../services/dashboardRecommendationService";
import { useLanguage } from "../context/LanguageContext";
import { usePHC } from "../context/PHCContext";

function AIAlerts() {
  const { t } = useLanguage();
  const { selectedPHC } = usePHC();

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, [selectedPHC]);

  async function loadRecommendations() {
    const data = await getTopRecommendations();

    const filtered =
      selectedPHC === "All PHCs"
        ? data
        : data.filter(
            (item) => item.phcName === selectedPHC
          );

    setRecommendations(filtered);
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

  function formatRecommendation(key) {
    switch (key) {
      case "deployDoctor":
        return "Deploy Additional Doctor";

      case "replenishMedicines":
        return "Replenish Medicine Stock";

      case "increaseBeds":
        return "Increase Bed Capacity";

      case "upgradeDiagnostics":
        return "Upgrade Diagnostic Facilities";

      default:
        return "No Action Required";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[360px] p-6 flex flex-col"
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-teal-700" />

        <div>
          <h2 className="text-xl font-bold">
            Recent AI Recommendations
          </h2>

          <p className="text-sm text-slate-500">
            {selectedPHC === "All PHCs"
              ? "Generated for all PHCs"
              : `Generated for ${selectedPHC}`}
          </p>
        </div>
      </div>

      {/* Recommendations */}

      <div className="space-y-3 flex-1 overflow-y-auto">

        {recommendations.length === 0 ? (

          <div className="text-center text-slate-500 py-10">
            No recommendations available.
          </div>

        ) : (

          recommendations.map((item) => {

            const rec = item.recommendations?.[0];

            return (
              <div
                key={item.id}
                className="border rounded-xl p-4 hover:bg-slate-50 transition"
              >
                <div className="flex justify-between items-center">

                  <h3 className="font-semibold">
                    {item.phcName}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>

                </div>

                <p className="text-slate-600 text-sm mt-2">
                  {rec
                    ? formatRecommendation(rec.key)
                    : "No recommendation"}
                </p>

              </div>
            );
          })

        )}

      </div>

      <Link
        to="/resource-allocation"
        className="flex justify-end items-center gap-1 mt-5 text-teal-700 hover:text-teal-900 font-medium"
      >
        View All
        <ChevronRight size={18} />
      </Link>

    </motion.div>
  );
}

export default AIAlerts;
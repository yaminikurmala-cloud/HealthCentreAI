import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, ChevronRight } from "lucide-react";
import { getAlerts } from "../services/alertService";
import AIDetailsModal from "./AIDetailsModal";
import { useLanguage } from "../context/LanguageContext";

function AIAlerts() {
  const { t } = useLanguage();

  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadAlerts() {
      const data = await getAlerts();
      setAlerts(data);
    }

    loadAlerts();
  }, []);

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case "Critical":
        return t.critical;

      case "Warning":
        return t.warning;

      case "Normal":
        return t.normal;

      default:
        return severity;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "Warning":
        return "bg-amber-100 text-amber-700";

      case "Normal":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[360px] p-6 flex flex-col"
      >
        {/* Header */}

        <div className="flex items-center gap-3 mb-6">
          <Brain className="text-teal-700" />

          <div>
            <h2 className="text-xl font-bold">
              {t.aiDecisionEngine}
            </h2>

            <p className="text-sm text-slate-500">
              {t.liveRecommendations}
            </p>
          </div>
        </div>

        {/* Alerts */}

        <div className="space-y-3 flex-1 overflow-y-auto pr-1">

          {alerts.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.4,
              }}
              whileHover={{ x: 4 }}
              className="border rounded-xl p-4 transition-all duration-300 hover:bg-slate-50 hover:border-teal-300 cursor-pointer"
            >

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-sm">
                  {item.title}
                </h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${getSeverityColor(
                    item.severity
                  )}`}
                >
                  {getSeverityLabel(item.severity)}
                </span>

              </div>

              <p className="text-sm text-slate-600 mt-2">
                {item.message}
              </p>

              <p className="text-sm mt-2 font-medium text-teal-700">
                → {item.recommendation}
              </p>

              <div className="flex justify-between mt-4">

                <span className="text-xs text-slate-400">
                  {t.confidence} {item.confidence}%
                </span>

                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setSelectedAlert(item);
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-teal-700 text-sm font-medium hover:text-teal-900"
                >
                  {t.view}
                  <ChevronRight size={15} />
                </motion.button>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.div>

      <AIDetailsModal
        open={modalOpen}
        alert={selectedAlert}
        onClose={() => {
          setModalOpen(false);
          setSelectedAlert(null);
        }}
      />
    </>
  );
}

export default AIAlerts;
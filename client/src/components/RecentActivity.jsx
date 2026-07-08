import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Pill,
  UserCheck,
  Activity,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { usePHC } from "../context/PHCContext";
import { getRecentActivities } from "../services/activityService";

function RecentActivity() {
  const { t } = useLanguage();
  const { selectedPHC } = usePHC();

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, [selectedPHC]);

  async function loadActivities() {
    const data = await getRecentActivities();

    const filtered =
      selectedPHC === "All PHCs"
        ? data
        : data.filter(
            (item) => item.phcName === selectedPHC
          );

    setActivities(filtered);
  }

  function getIcon(type) {
    switch (type) {
      case "medicine":
        return Pill;

      case "doctor":
        return UserCheck;

      case "patient":
        return Activity;

      case "test":
        return ClipboardList;

      default:
        return AlertTriangle;
    }
  }

  function getColor(type) {
    switch (type) {
      case "medicine":
        return "bg-red-100 text-red-700";

      case "doctor":
        return "bg-blue-100 text-blue-700";

      case "patient":
        return "bg-green-100 text-green-700";

      case "test":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[380px] flex flex-col"
    >
      {/* Header */}

      <div className="mb-5">

        <h2 className="text-xl font-bold text-slate-800">
          {t.recentActivity}
        </h2>

        <p className="text-sm text-slate-500">
          {selectedPHC === "All PHCs"
            ? "Live updates across all PHCs"
            : `Live updates for ${selectedPHC}`}
        </p>

      </div>

      {/* Activity List */}

      <div className="space-y-4 overflow-y-auto flex-1">

        {activities.length === 0 ? (

          <div className="text-center py-10 text-slate-500">
            No recent activities.
          </div>

        ) : (

          activities.map((item, index) => {

            const Icon = getIcon(item.type);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
                className="flex gap-3 border-b border-slate-100 pb-4"
              >

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(
                    item.type
                  )}`}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1">

                  <h3 className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {item.description}
                  </p>

                  <div className="flex justify-between mt-2">

                    <span className="text-xs text-teal-600 font-medium">
                      {item.phcName}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.date || ""}
                    </span>

                  </div>

                </div>

              </motion.div>
            );
          })

        )}

      </div>

    </motion.div>
  );
}

export default RecentActivity;
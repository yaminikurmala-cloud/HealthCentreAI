import { motion } from "framer-motion";
import {
  Pill,
  Truck,
  UserCheck,
  BedDouble,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function RecentActivity() {
  const { t } = useLanguage();

  const activities = [
    {
      icon: Pill,
      color: "bg-red-100 text-red-600",
      title: t.paracetamolCritical,
      location: "PHC Kothapalli",
      time: "10:42 AM",
    },
    {
      icon: Truck,
      color: "bg-teal-100 text-teal-700",
      title: t.medicineTransfer,
      location: "PHC Tadepalli → PHC Nunna",
      time: "10:15 AM",
    },
    {
      icon: BedDouble,
      color: "bg-amber-100 text-amber-700",
      title: t.bedOccupancy,
      location: "PHC Vijayawada Rural",
      time: "09:58 AM",
    },
    {
      icon: UserCheck,
      color: "bg-green-100 text-green-700",
      title: t.doctorAttendance,
      location: "District Health Office",
      time: "09:25 AM",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[380px] flex flex-col"
    >
      {/* Header */}

      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          {t.recentActivity}
        </h2>

        <p className="text-sm text-slate-500">
          {t.liveDistrictUpdates}
        </p>
      </div>

      {/* Activities */}

      <div className="space-y-4 overflow-y-auto flex-1">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.4,
              }}
              whileHover={{
                x: 6,
              }}
              className="flex gap-3 border-b border-slate-100 pb-4 cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {item.location}
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  {item.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default RecentActivity;
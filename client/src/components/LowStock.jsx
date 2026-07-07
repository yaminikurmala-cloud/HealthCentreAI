import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
} from "lucide-react";

import { getLowStockMedicines } from "../services/lowStockService";
import { useLanguage } from "../context/LanguageContext";

function LowStock() {
  const { t } = useLanguage();

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    async function loadMedicines() {
      const data = await getLowStockMedicines();
      setMedicines(data);
    }

    loadMedicines();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "Warning":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Critical":
        return t.critical;

      case "Warning":
        return t.warning;

      case "Normal":
        return t.normal;

      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[360px] p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          {t.lowStock}
        </h2>

        <span className="text-sm text-teal-700 font-medium">
          {t.aiRedistribution}
        </span>

      </div>

      <div className="space-y-4 overflow-y-auto">

        {medicines.map((item, index) => (

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

            <div className="flex justify-between">

              <h3 className="font-semibold text-sm">
                {item.name}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  item.status
                )}`}
              >
                {getStatusLabel(item.status)}
              </span>

            </div>

            <div className="mt-2 text-sm text-slate-500">
              {t.remaining}

              <span className="font-semibold ml-1">
                {item.stock} / {item.required}
              </span>

            </div>

            <div className="mt-3 bg-teal-50 rounded-lg p-3">

              <div className="flex items-center gap-2 text-teal-700 font-medium">

                <Truck size={16} />

                {t.suggestedTransfer}

              </div>

              <div className="mt-2 text-sm">

                <div className="flex items-center gap-2">

                  <ArrowRight size={14} />

                  {item.transferFrom}

                </div>

                <div className="mt-3 text-teal-700 font-semibold">

                  {t.available}: {item.transferUnits} {t.units}

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}

export default LowStock;
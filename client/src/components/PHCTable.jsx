import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "../context/LanguageContext";
import { getPHCOverview } from "../services/phcOverviewService";
import { usePHC } from "../context/PHCContext";
function PHCTable() {
  const { t } = useLanguage();
const { selectedPHC } = usePHC();

  const [phcs, setPhcs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPHCs();
  }, []);

  async function loadPHCs() {
    try {
      setLoading(true);

      const data = await getPHCOverview();

      setPhcs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "healthy":
        return t.healthy;

      case "attention":
        return t.needsAttention;

      case "critical":
        return t.critical;

      default:
        return status;
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700";

      case "attention":
        return "bg-yellow-100 text-yellow-700";

      case "critical":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      <div className="mb-5">

        <h2 className="text-2xl font-bold text-slate-800">
          {t.phcOverview}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {t.livePHCOverview}
        </p>

      </div>

      {loading ? (
        <div className="text-center py-10">
          {t.loading}
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  {t.phc}
                </th>

                <th className="text-center py-3">
                  {t.patients}
                </th>

                <th className="text-center py-3">
                  {t.doctors}
                </th>

                <th className="text-center py-3">
                  {t.medicines}
                </th>

                <th className="text-center py-3">
                  {t.tests}
                </th>

                <th className="text-center py-3">
                  {t.status}
                </th>

              </tr>

            </thead>

            <tbody>

            {phcs
  .filter(
    (item) =>
      selectedPHC === "All PHCs" ||
      item.name === selectedPHC
  )
  .map((item) => (

    <tr
      key={item.id}
      className="border-b hover:bg-slate-50"
    >

      <td className="py-4 font-semibold">
        {item.name}
      </td>

      <td className="text-center">
        {item.patientCount}
      </td>

      <td className="text-center">
        {item.doctorCount}
      </td>

      <td className="text-center">
        {item.medicineCount}
      </td>

      <td className="text-center">
        {item.availableTests}/10
      </td>

      <td className="text-center">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            item.status
          )}`}
        >
          {getStatusText(item.status)}
        </span>

      </td>

    </tr>

))}
            </tbody>

          </table>

        </div>
      )}

    </motion.div>
  );
}

export default PHCTable;
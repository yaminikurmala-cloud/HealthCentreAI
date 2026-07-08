import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function MedicineTable({
  medicines,
  loading,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  function getStatusText(status) {
    const value = (status || "").toLowerCase();

    switch (value) {
      case "healthy":
        return t.healthy || "Healthy";

      case "warning":
        return t.warning || "Warning";

      case "critical":
        return t.critical || "Critical";

      default:
        return status;
    }
  }

  function getStatusColor(status) {
    const value = (status || "").toLowerCase();

    switch (value) {
      case "critical":
        return "bg-red-100 text-red-700";

      case "warning":
        return "bg-yellow-100 text-yellow-700";

      case "healthy":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.loadingMedicines}
        </p>
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.noMedicinesFound}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>

            <th className="text-left px-6 py-4">
              {t.medicine}
            </th>

            <th className="text-left px-6 py-4">
              {t.stock}
            </th>

            <th className="text-left px-6 py-4">
              {t.required}
            </th>

            <th className="text-left px-6 py-4">
              {t.status}
            </th>

            <th className="text-center px-6 py-4">
              {t.actions}
            </th>

          </tr>
        </thead>

        <tbody>

          {medicines.map((medicine) => (

            <tr
              key={medicine.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {medicine.name}
              </td>

              <td className="px-6 py-4">
                {medicine.stock}
              </td>

              <td className="px-6 py-4">
                {medicine.required}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    medicine.status
                  )}`}
                >
                  {getStatusText(
                    medicine.status
                  )}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(medicine)}
                    className="text-blue-600 hover:text-blue-800"
                    title={t.edit}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(medicine.id)}
                    className="text-red-600 hover:text-red-800"
                    title={t.delete}
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

export default MedicineTable;
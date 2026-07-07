import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function PHCTable({
  phcs,
  loading,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  const getStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return t.active;

      case "inactive":
        return t.inactive;

      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.loadingPHCs}
        </p>
      </div>
    );
  }

  if (phcs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.noPHCsFound}
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
              {t.phcName}
            </th>

            <th className="text-left px-6 py-4">
              {t.district}
            </th>

            <th className="text-left px-6 py-4">
              {t.doctors}
            </th>

            <th className="text-left px-6 py-4">
              {t.patients}
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

          {phcs.map((phc) => (

            <tr
              key={phc.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {phc.name}
              </td>

              <td className="px-6 py-4">
                {phc.district}
              </td>

              <td className="px-6 py-4">
                {phc.doctorCount}
              </td>

              <td className="px-6 py-4">
                {phc.patientCount}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    phc.status?.toLowerCase() === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {getStatus(phc.status)}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(phc)}
                    className="text-blue-600 hover:text-blue-800"
                    title={t.edit}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(phc.id)}
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

export default PHCTable;
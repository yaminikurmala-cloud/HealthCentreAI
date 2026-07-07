import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function PatientTable({
  patients,
  loading,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  const getStatus = (status) => {
    switch (status) {
      case "Critical":
        return t.critical;

      case "Stable":
        return t.stable;

      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.loadingPatients}
        </p>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.noPatientsFound}
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
              {t.name}
            </th>

            <th className="text-left px-6 py-4">
              {t.age}
            </th>

            <th className="text-left px-6 py-4">
              {t.gender}
            </th>

            <th className="text-left px-6 py-4">
              {t.village}
            </th>

            <th className="text-left px-6 py-4">
              {t.phc}
            </th>

            <th className="text-left px-6 py-4">
              {t.diagnosis}
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

          {patients.map((patient) => (

            <tr
              key={patient.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {patient.fullName}
              </td>

              <td className="px-6 py-4">
                {patient.age}
              </td>

              <td className="px-6 py-4">
                {patient.gender}
              </td>

              <td className="px-6 py-4">
                {patient.village}
              </td>

              <td className="px-6 py-4">
                {patient.phcName || patient.phc}
              </td>

              <td className="px-6 py-4">
                {patient.diagnosis}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    patient.status === "Critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {getStatus(patient.status)}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(patient)}
                    className="text-blue-600 hover:text-blue-800"
                    title={t.edit}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(patient.id)}
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

export default PatientTable;
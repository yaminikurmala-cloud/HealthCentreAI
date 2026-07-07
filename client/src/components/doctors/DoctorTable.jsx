import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function DoctorTable({
  doctors,
  loading,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  const getStatus = (status) => {
    switch (status) {
      case "Available":
        return t.available;

      case "On Leave":
        return t.onLeave;

      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.loadingDoctors}
        </p>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.noDoctorsFound}
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
              {t.doctor}
            </th>

            <th className="text-left px-6 py-4">
              {t.specialization}
            </th>

            <th className="text-left px-6 py-4">
              {t.phc}
            </th>

            <th className="text-left px-6 py-4">
              {t.experience}
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

          {doctors.map((doctor) => (

            <tr
              key={doctor.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {doctor.name}
              </td>

              <td className="px-6 py-4">
                {doctor.specialization}
              </td>

              <td className="px-6 py-4">
                {doctor.phcName}
              </td>

              <td className="px-6 py-4">
                {doctor.experience} {t.years}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {getStatus(doctor.status)}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(doctor)}
                    className="text-blue-600 hover:text-blue-800"
                    title={t.edit}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(doctor.id)}
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

export default DoctorTable;
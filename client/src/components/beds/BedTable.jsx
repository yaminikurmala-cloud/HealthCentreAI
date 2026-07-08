import { useLanguage } from "../../context/LanguageContext";

function BedTable({
  beds,
  loading,
}) {
  const { t } = useLanguage();

  function getStatus(status) {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700";

      case "warning":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "healthy":
        return t.healthy;

      case "warning":
        return t.warning;

      default:
        return t.critical;
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-6 py-4">
              {t.phc}
            </th>

            <th className="text-center px-6 py-4">
              {t.totalBeds}
            </th>

            <th className="text-center px-6 py-4">
              {t.occupiedBeds}
            </th>

            <th className="text-center px-6 py-4">
              {t.availableBeds}
            </th>

            <th className="text-center px-6 py-4">
              {t.occupancy}
            </th>

            <th className="text-center px-6 py-4">
              {t.status}
            </th>

          </tr>

        </thead>

        <tbody>

          {beds.map((phc) => (

            <tr
              key={phc.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {phc.name}
              </td>

              <td className="text-center">
                {phc.totalBeds}
              </td>

              <td className="text-center">
                {phc.occupiedBeds}
              </td>

              <td className="text-center font-bold text-green-700">
                {phc.availableBeds}
              </td>

              <td className="text-center">
                {phc.occupancy}%
              </td>

              <td className="text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatus(
                    phc.status
                  )}`}
                >
                  {getStatusText(
                    phc.status
                  )}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default BedTable;
import { useLanguage } from "../context/LanguageContext";

function PHCTable() {
  const { t } = useLanguage();

  const phcs = [
    {
      name: "PHC Tadepalli",
      patients: 235,
      doctors: 6,
      status: "Active",
    },
    {
      name: "PHC Mangalagiri",
      patients: 180,
      doctors: 5,
      status: "Active",
    },
    {
      name: "PHC Amaravathi",
      patients: 145,
      doctors: 4,
      status: "Active",
    },
    {
      name: "PHC Tenali",
      patients: 210,
      doctors: 7,
      status: "Active",
    },
  ];

  const getStatus = (status) => {
    switch (status) {
      case "Active":
        return t.active;

      case "Inactive":
        return t.inactive;

      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-4">
        {t.phcOverview}
      </h2>

      <table className="w-full">

        <thead className="border-b">

          <tr>

            <th className="text-left py-3">
              {t.phc}
            </th>

            <th className="text-left py-3">
              {t.patients}
            </th>

            <th className="text-left py-3">
              {t.doctors}
            </th>

            <th className="text-left py-3">
              {t.status}
            </th>

          </tr>

        </thead>

        <tbody>

          {phcs.map((phc) => (

            <tr
              key={phc.name}
              className="border-b"
            >

              <td className="py-3">
                {phc.name}
              </td>

              <td>
                {phc.patients}
              </td>

              <td>
                {phc.doctors}
              </td>

              <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                  {getStatus(phc.status)}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PHCTable;
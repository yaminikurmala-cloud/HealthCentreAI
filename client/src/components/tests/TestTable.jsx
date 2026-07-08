import {
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function TestTable({
  tests,
  loading,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  const testFields = [
    { key: "bloodPressure", label: t.bloodPressure },
    { key: "bloodSugar", label: t.bloodSugar },
    { key: "cbc", label: t.cbc },
    { key: "malaria", label: t.malaria },
    { key: "dengue", label: t.dengue },
    { key: "urine", label: t.urine },
    { key: "pregnancy", label: t.pregnancy },
    { key: "ecg", label: t.ecg },
    { key: "xray", label: t.xray },
    { key: "ultrasound", label: t.ultrasound },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.loadingTests}
        </p>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-500">
          {t.noTests}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              {t.phc}
            </th>

            {testFields.map((test) => (
              <th
                key={test.key}
                className="px-4 py-4 text-center text-sm"
              >
                {test.label}
              </th>
            ))}

            <th className="px-6 py-4 text-center">
              {t.actions}
            </th>

          </tr>

        </thead>

        <tbody>

          {tests.map((phc) => (

            <tr
              key={phc.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-semibold">
                {phc.phcName}
              </td>

              {testFields.map((test) => (

                <td
                  key={test.key}
                  className="text-center"
                >
                  {phc[test.key] ? (
                    <CheckCircle2
                      className="text-green-600 mx-auto"
                      size={20}
                    />
                  ) : (
                    <XCircle
                      className="text-red-500 mx-auto"
                      size={20}
                    />
                  )}
                </td>

              ))}

              <td>

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(phc)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(phc.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
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

export default TestTable;
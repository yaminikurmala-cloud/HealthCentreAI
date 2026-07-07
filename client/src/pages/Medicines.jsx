import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import { Search, Pill, AlertTriangle, Package } from "lucide-react";
import { getMedicines } from "../services/medicineService";
import { useLanguage } from "../context/LanguageContext";

function Medicines() {
  const { t } = useLanguage();

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    try {
      setLoading(true);
      const data = await getMedicines();
      setMedicines(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) =>
      medicine.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [medicines, search]);

  const total = medicines.length;

  const critical = medicines.filter(
    (m) => m.status?.toLowerCase() === "critical"
  ).length;

  const low = medicines.filter(
    (m) => m.status?.toLowerCase() === "low"
  ).length;

  const getStatus = (status) => {
    switch (status) {
      case "Critical":
        return t.critical;

      case "Low":
        return t.low;

      case "Available":
        return t.available;

      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            {t.medicinesManagement}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.medicinesManagementDesc}
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Package className="text-blue-600 mb-3" />
            <p className="text-gray-500">
              {t.totalMedicines}
            </p>
            <h2 className="text-4xl font-bold">{total}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Pill className="text-yellow-600 mb-3" />
            <p className="text-gray-500">
              {t.lowStock}
            </p>
            <h2 className="text-4xl font-bold">{low}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <AlertTriangle className="text-red-600 mb-3" />
            <p className="text-gray-500">
              {t.criticalStock}
            </p>
            <h2 className="text-4xl font-bold">{critical}</h2>
          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-3">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder={t.searchMedicine}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />

        </div>

        {/* Table */}

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

                <th className="text-left px-6 py-4">
                  {t.transferFrom}
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8"
                  >
                    {t.loadingMedicines}
                  </td>
                </tr>

              ) : filteredMedicines.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8"
                  >
                    {t.noMedicinesFound}
                  </td>
                </tr>

              ) : (

                filteredMedicines.map((medicine) => (

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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          medicine.status === "Critical"
                            ? "bg-red-100 text-red-700"
                            : medicine.status === "Low"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {getStatus(medicine.status)}
                      </span>

                    </td>

                    <td className="px-6 py-4">
                      {medicine.transferFrom || "-"}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
}

export default Medicines;
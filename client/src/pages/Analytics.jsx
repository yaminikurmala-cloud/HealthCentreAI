import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import { Users, Stethoscope, Pill, Building2 } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

import { getPatients } from "../services/patientService";
import { getDoctors } from "../services/doctorService";
import { getMedicines } from "../services/medicineService";
import { getPHCs } from "../services/phcService";

function Analytics() {
  const { t } = useLanguage();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [phcs, setPHCs] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const [
        patientData,
        doctorData,
        medicineData,
        phcData,
      ] = await Promise.all([
        getPatients(),
        getDoctors(),
        getMedicines(),
        getPHCs(),
      ]);

      setPatients(patientData);
      setDoctors(doctorData);
      setMedicines(medicineData);
      setPHCs(phcData);

    } catch (error) {
      console.error(error);
    }
  }

  const cards = [
    {
      title: t.patients,
      value: patients.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: t.doctors,
      value: doctors.length,
      icon: Stethoscope,
      color: "text-green-600",
    },
    {
      title: t.medicines,
      value: medicines.length,
      icon: Pill,
      color: "text-yellow-600",
    },
    {
      title: t.phcs,
      value: phcs.length,
      icon: Building2,
      color: "text-purple-600",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            {t.analyticsDashboard}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.analyticsDescription}
          </p>

        </div>

        <div className="grid grid-cols-4 gap-6">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-sm p-6"
              >

                <Icon
                  className={`${card.color} mb-3`}
                  size={32}
                />

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>
            );
          })}

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-bold mb-6">
            {t.collectionSummary}
          </h2>

          <table className="w-full">

            <tbody>

              <tr className="border-b">
                <td className="py-4 font-medium">
                  {t.patients}
                </td>

                <td className="py-4 text-right">
                  {patients.length}
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-medium">
                  {t.doctors}
                </td>

                <td className="py-4 text-right">
                  {doctors.length}
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4 font-medium">
                  {t.medicines}
                </td>

                <td className="py-4 text-right">
                  {medicines.length}
                </td>
              </tr>

              <tr>
                <td className="py-4 font-medium">
                  {t.phcs}
                </td>

                <td className="py-4 text-right">
                  {phcs.length}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
}

export default Analytics;
import Layout from "../components/layout/Layout";

import {
  seedPHCs,
  seedDoctors,
  seedPatients,
  seedMedicines,
  seedTests,
} from "../services/demoSeederService";
function Seeder() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-10">

        <h1 className="text-3xl font-bold text-slate-800">
          Demo Data Seeder
        </h1>

        <p className="text-slate-500 mt-2">
          Generate Hackathon Demo Data with One Click
        </p>

        <div className="flex flex-wrap gap-5 mt-10">

          <button
            onClick={seedPHCs}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold shadow"
          >
            🚀 Seed PHCs
          </button>

          <button
            onClick={seedDoctors}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold shadow"
          >
            👨‍⚕️ Seed Doctors
          </button>
             <button
    onClick={seedPatients}
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold shadow"
  >
    🧑‍🤝‍🧑 Seed Patients
  </button>
  <button
  onClick={seedMedicines}
  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-xl font-semibold shadow"
>
  💊 Seed Medicines
</button>
          <button
  onClick={seedTests}
  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold shadow"
>
  🧪 Seed Tests
</button>

        </div>

      </div>
    </Layout>
  );
}

export default Seeder;
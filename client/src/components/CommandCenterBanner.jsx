import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Activity,
  Ambulance,
  Stethoscope,
  Pill,
  Brain,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

import { getPatients } from "../services/patientService";
import { getDoctors } from "../services/doctorService";
import { getMedicines } from "../services/medicineService";

function CommandCenterBanner() {
  const { t } = useLanguage();
const [emergencyCases, setEmergencyCases] = useState(0);
const [doctorCount, setDoctorCount] = useState(0);
const [criticalMedicines, setCriticalMedicines] = useState(0);

useEffect(() => {
  loadSummary();
}, []);

async function loadSummary() {
  const patients = await getPatients();
  const doctors = await getDoctors();
  const medicines = await getMedicines();

  setEmergencyCases(
    patients.filter((p) => p.status === "Critical").length
  );

  setDoctorCount(doctors.length);

  setCriticalMedicines(
    medicines.filter((m) => m.status === "Critical").length
  );
}
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl mt-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <Activity size={28} />

            <div>
              <h2 className="text-3xl font-bold">
                {t.commandSummary}
              </h2>

              <p className="text-teal-100 mt-1">
                {t.commandSummaryDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-500/20 border border-green-300 rounded-full px-5 py-2">
          <span className="font-semibold">
            🟢 {t.systemOperational}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">

        {/* Emergency Cases */}

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-5"
        >
          <Ambulance className="mb-4" size={28} />

          <p className="text-teal-100 text-sm">
            {t.emergencyCases}
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {emergencyCases}
          </h3>
        </motion.div>

        {/* Doctors */}

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-5"
        >
          <Stethoscope className="mb-4" size={28} />

          <p className="text-teal-100 text-sm">
            {t.doctorsAvailable}
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {doctorCount}
          </h3>
        </motion.div>

        {/* Critical Medicines */}

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-5"
        >
          <Pill className="mb-4" size={28} />

          <p className="text-teal-100 text-sm">
            {t.criticalMedicines}
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {criticalMedicines}
          </h3>
        </motion.div>

        {/* AI Prediction */}

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-5"
        >
   <Brain className="mb-4" size={28} />

<p className="text-teal-100 text-sm">
  AI Resource Engine
</p>

<h3 className="text-lg font-semibold mt-2">
  Active
</h3>

<p className="text-teal-100 text-sm mt-1">
  Continuously analyzing district healthcare data
</p>
        </motion.div>

      </div>
    </motion.div>
  );
}

export default CommandCenterBanner;
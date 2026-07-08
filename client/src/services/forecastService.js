import { getPatients } from "./patientService";
import { getDoctors } from "./doctorService";
import { getMedicines } from "./medicineService";
import { getTests } from "./testService";

const TEST_FIELDS = [
  "bloodPressure",
  "bloodSugar",
  "cbc",
  "malaria",
  "dengue",
  "urine",
  "pregnancy",
  "ecg",
  "xray",
  "ultrasound",
];

export async function getDemandForecast() {
  const [
    patients,
    doctors,
    medicines,
    tests,
  ] = await Promise.all([
    getPatients(),
    getDoctors(),
    getMedicines(),
    getTests(),
  ]);

const phcNames = [
  ...new Set(
    [
      ...patients.map((p) => p.phcName),
      ...doctors.map((d) => d.phcName),
      ...medicines.map((m) => m.phcName),
      ...tests.map((t) => t.phcName),
    ].filter((name) => name && name.trim() !== "")
  ),
];

  console.log("Patients:", patients);
console.log("Doctors:", doctors);
console.log("Medicines:", medicines);
console.log("Tests:", tests);
console.log("PHCs:", phcNames);
  return phcNames
    .map((phc) => {
      const phcPatients = patients.filter(
        (p) => p.phcName === phc
      );

      const phcDoctors = doctors.filter(
        (d) => d.phcName === phc
      );

      const phcMedicines = medicines.filter(
        (m) => m.phcName === phc
      );

      const phcTests =
        tests.find((t) => t.phcName === phc) || {};

      // -----------------------------
      // BASIC METRICS
      // -----------------------------

      const patientCount = phcPatients.length;

      const doctorCount = phcDoctors.length;

      const patientsPerDoctor =
        doctorCount > 0
          ? patientCount / doctorCount
          : patientCount;

      const lowMedicines = phcMedicines.filter(
        (m) =>
          m.status === "Low" ||
          m.status === "Critical"
      ).length;

      const criticalMedicines = phcMedicines.filter(
        (m) => m.status === "Critical"
      ).length;

      const availableTests = TEST_FIELDS.filter(
        (field) => phcTests[field]
      ).length;

      // -----------------------------
      // DEMAND INDEX
      // -----------------------------

      let demandIndex = 0;

      // Patient load (40)
      demandIndex += Math.min(
        (patientCount / 300) * 40,
        40
      );

      // Doctor workload (25)
      demandIndex += Math.min(
        (patientsPerDoctor / 80) * 25,
        25
      );

      // Medicine shortage (20)
      demandIndex += Math.min(
        (lowMedicines / 10) * 20,
        20
      );

      // Test deficiency (15)
      demandIndex +=
        ((10 - availableTests) / 10) * 15;

      demandIndex = Math.round(demandIndex);

      // -----------------------------
      // FORECAST
      // -----------------------------

      const growthPercent =
        5 + Math.round(demandIndex / 8);

      const forecastPatients = Math.round(
        patientCount * (1 + growthPercent / 100)
      );

      // -----------------------------
      // HEALTH SCORE
      // -----------------------------

      let score = 100;

      score -= Math.min(
        patientsPerDoctor / 2,
        30
      );

      score -= lowMedicines * 4;

      score -= criticalMedicines * 5;

      score -= (10 - availableTests) * 2;

      score = Math.max(
        0,
        Math.min(100, Math.round(score))
      );

      // -----------------------------
      // STATUS
      // -----------------------------

      let status = "healthy";

      if (score < 80)
        status = "needs_attention";

      if (score < 60)
        status = "critical";

      // -----------------------------
      // PRIORITY
      // -----------------------------

  let priority = "low";

if (status === "critical") {
  priority = "high";
} else if (status === "needs_attention") {
  priority = "medium";
}

      // -----------------------------
      // AI RECOMMENDATIONS
      // -----------------------------

      const recommendations = [];

      if (patientsPerDoctor > 50) {
        recommendations.push(
          "Deploy additional doctors."
        );
      }

      if (lowMedicines > 2) {
        recommendations.push(
          "Replenish medicine stock."
        );
      }

      if (criticalMedicines > 0) {
        recommendations.push(
          "Immediately transfer critical medicines."
        );
      }

      if (availableTests < 7) {
        recommendations.push(
          "Upgrade diagnostic facilities."
        );
      }

      if (forecastPatients > patientCount * 1.15) {
        recommendations.push(
          "Prepare for increased patient inflow."
        );
      }

      if (recommendations.length === 0) {
        recommendations.push(
          "Routine monitoring recommended."
        );
      }
console.log(
  "Forecast:",
  JSON.stringify({
    phc,
    patientCount,
    doctorCount,
    lowMedicines,
    availableTests,
    status,
  })
);

      return {
        phc,

        patientCount,

        forecastPatients,

        growthPercent,

        doctorCount,

        patientsPerDoctor:
          Number(
            patientsPerDoctor.toFixed(1)
          ),

        lowMedicines,

        criticalMedicines,

        availableTests,

        demandIndex,

        healthScore: score,

        priority,

        status,

        recommendations,
      };
    })
    .sort(
      (a, b) =>
        b.demandIndex - a.demandIndex
    );
}
import { getPatients } from "./patientService";
import { getDoctors } from "./doctorService";
import { getMedicines } from "./medicineService";
import { getTests } from "./testService";
import { getPHCs } from "./phcService";

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

export async function getResourceAllocation() {
  const [
    patients,
    doctors,
    medicines,
    tests,
    phcs,
  ] = await Promise.all([
    getPatients(),
    getDoctors(),
    getMedicines(),
    getTests(),
    getPHCs(),
  ]);

  return phcs.map((phc) => {
    const phcName = phc.name;

    const patientCount = patients.filter(
      (p) => p.phcName === phcName
    ).length;

    const doctorCount = doctors.filter(
      (d) => d.phcName === phcName
    ).length;

    const medicineShortage = medicines.filter(
      (m) =>
        m.phcName === phcName &&
        (
          m.status === "Critical" ||
          m.status === "Warning"
        )
    ).length;

    const testData =
      tests.find((t) => t.phcName === phcName) || {};

    const availableTests = TEST_FIELDS.reduce(
      (count, field) => {
        const value = testData[field];

        if (
          value === true ||
          value === "true" ||
          value === 1 ||
          value === "1"
        ) {
          return count + 1;
        }

        return count;
      },
      0
    );

    console.log("==========");
    console.log("PHC:", phcName);
    console.log(
      "Matched Test:",
      JSON.stringify(testData, null, 2)
    );
    console.log("Available Tests:", availableTests);

    const totalBeds = Number(
      phc.totalBeds || 0
    );

    const occupiedBeds = Number(
      phc.occupiedBeds || 0
    );

    const availableBeds =
      totalBeds - occupiedBeds;

    const requiredDoctors = Math.max(
      0,
      Math.ceil(patientCount / 20) - doctorCount
    );

    let healthScore = 100;

    healthScore -= patientCount * 2;
    healthScore -= medicineShortage * 10;
    healthScore -= (10 - availableTests) * 2;

    if (requiredDoctors > 0)
      healthScore -= 15;

    if (availableBeds < 5)
      healthScore -= 15;

    healthScore = Math.max(
      0,
      Math.min(100, healthScore)
    );

    let priority = "Low";

    if (healthScore < 60)
      priority = "Critical";
    else if (healthScore < 80)
      priority = "Medium";

    const recommendations = [];

    if (requiredDoctors > 0) {
      recommendations.push({
        type: "doctor",
        key: "deployDoctor",
        reasonKey: "doctorReason",
        values: {
          patients: patientCount,
          doctors: doctorCount,
          required: requiredDoctors,
        },
      });
    }

    if (medicineShortage > 0) {
      recommendations.push({
        type: "medicine",
        key: "replenishMedicines",
        reasonKey: "medicineReason",
        values: {
          shortage: medicineShortage,
        },
      });
    }

    if (availableBeds < 5) {
      recommendations.push({
        type: "beds",
        key: "increaseBeds",
        reasonKey: "bedReason",
        values: {
          available: availableBeds,
          total: totalBeds,
        },
      });
    }

    if (availableTests < 8) {
      recommendations.push({
        type: "tests",
        key: "upgradeDiagnostics",
        reasonKey: "testReason",
        values: {
          available: availableTests,
        },
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: "healthy",
        key: "noActionRequired",
        reasonKey: "healthyReason",
        values: {},
      });
    }

    return {
      id: phc.id,
      phcName,
      patientCount,
      doctorCount,
      totalBeds,
      occupiedBeds,
      availableBeds,
      availableTests,
      medicineShortage,
      requiredDoctors,
      healthScore,
      priority,
      recommendations,
    };
  });
}
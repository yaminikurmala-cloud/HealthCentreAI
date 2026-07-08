import { getPHCs } from "./phcService";
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

export async function getPHCOverview() {
  const [
    phcs,
    patients,
    doctors,
    medicines,
    tests,
  ] = await Promise.all([
    getPHCs(),
    getPatients(),
    getDoctors(),
    getMedicines(),
    getTests(),
  ]);

  return phcs.map((phc) => {
    const phcName = phc.name;

    const patientCount = patients.filter(
      (p) => p.phcName === phcName
    ).length;

    const doctorCount = doctors.filter(
      (d) => d.phcName === phcName
    ).length;

    const medicineCount = medicines.filter(
      (m) => m.phcName === phcName
    ).length;

    const lowMedicines = medicines.filter(
      (m) =>
        m.phcName === phcName &&
        (m.status === "Low" ||
          m.status === "Critical")
    ).length;

    const testData =
      tests.find((t) => t.phcName === phcName) || {};

    const availableTests =
      TEST_FIELDS.filter(
        (field) => testData[field]
      ).length;

    let status = "healthy";

    if (
      doctorCount === 0 ||
      lowMedicines >= 3 ||
      availableTests < 5
    ) {
      status = "critical";
    } else if (
      lowMedicines > 0 ||
      availableTests < 8
    ) {
      status = "attention";
    }

    return {
      id: phc.id,
      name: phcName,
      patientCount,
      doctorCount,
      medicineCount,
      availableTests,
      status,
    };
  });
}
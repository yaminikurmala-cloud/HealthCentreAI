import { getPatients } from "./patientService";
import { getDoctors } from "./doctorService";
import { getMedicines } from "./medicineService";
import { getPHCs } from "./phcService";
import { getTests } from "./testService";

function normalize(value) {
  return (value || "").trim().toLowerCase();
}

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

export async function getDistrictData() {
  const [
    patients,
    doctors,
    medicines,
    phcs,
    tests,
  ] = await Promise.all([
    getPatients(),
    getDoctors(),
    getMedicines(),
    getPHCs(),
    getTests(),
  ]);

  const overview = phcs.map((phc) => {
    const name = phc.name;

    const patientCount = patients.filter(
      (p) =>
        normalize(p.phcName) === normalize(name)
    ).length;

    const doctorCount = doctors.filter(
      (d) =>
        normalize(d.phcName) === normalize(name)
    ).length;

    const medicineCount = medicines.filter(
      (m) =>
        normalize(m.phcName) === normalize(name)
    ).length;

    const test =
      tests.find(
        (t) =>
          normalize(t.phcName) === normalize(name)
      ) || {};

    const availableTests =
      TEST_FIELDS.filter((field) => test[field])
        .length;

    return {
      ...phc,

      patientCount,

      doctorCount,

      medicineCount,

      availableTests,
    };
  });

  return {
    patients,
    doctors,
    medicines,
    phcs,
    tests,
    overview,
  };
}
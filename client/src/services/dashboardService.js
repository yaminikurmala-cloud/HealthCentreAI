import { getPatients } from "./patientService";
import { getDoctors } from "./doctorService";
import { getMedicines } from "./medicineService";
import { getPHCs } from "./phcService";

export async function getDashboardData(selectedPHC = "All PHCs") {
  try {
    const [patients, doctors, medicines, phcs] =
      await Promise.all([
        getPatients(),
        getDoctors(),
        getMedicines(),
        getPHCs(),
      ]);

    const filteredPatients =
      selectedPHC === "All PHCs"
        ? patients
        : patients.filter(
            (p) =>
              p.phcName === selectedPHC ||
              p.phc === selectedPHC
          );

    const filteredDoctors =
      selectedPHC === "All PHCs"
        ? doctors
        : doctors.filter(
            (d) => d.phcName === selectedPHC
          );

    const filteredMedicines =
      selectedPHC === "All PHCs"
        ? medicines
        : medicines.filter(
            (m) => m.phcName === selectedPHC
          );

    const filteredPHCs =
      selectedPHC === "All PHCs"
        ? phcs
        : phcs.filter(
            (p) => p.name === selectedPHC
          );

    return {
      patientsToday: filteredPatients.length,

      medicineItems: filteredMedicines.length,

      doctorsOnDuty: filteredDoctors.filter(
        (d) =>
          d.status?.toLowerCase() === "available"
      ).length,

      emergencyCases: filteredPatients.filter(
        (p) =>
          p.status?.toLowerCase() === "critical"
      ).length,

      availableBeds:
        filteredPHCs.reduce(
          (sum, phc) =>
            sum +
            Number(
              phc.availableBeds ||
                phc.beds ||
                0
            ),
          0
        ),

      testsAvailable:
        filteredPHCs.reduce(
          (sum, phc) =>
            sum +
            Number(
              phc.testsAvailable ||
                0
            ),
          0
        ),
    };
  } catch (error) {
    console.error(error);

    return {
      patientsToday: 0,
      medicineItems: 0,
      doctorsOnDuty: 0,
      emergencyCases: 0,
      availableBeds: 0,
      testsAvailable: 0,
    };
  }
}
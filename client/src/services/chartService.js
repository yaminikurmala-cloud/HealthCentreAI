import { getPatients } from "./patientService";

export async function getPatientChartData(selectedPHC = "All PHCs") {
  let patients = await getPatients();

  // Filter patients based on selected PHC
  if (selectedPHC !== "All PHCs") {
    patients = patients.filter(
      (patient) => patient.phcName === selectedPHC
    );
  }

  const counts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  };

  patients.forEach((patient) => {
    if (!patient.admittedDate) return;

    const date = new Date(patient.admittedDate);
    const day = date.getDay();

    switch (day) {
      case 1:
        counts.monday++;
        break;
      case 2:
        counts.tuesday++;
        break;
      case 3:
        counts.wednesday++;
        break;
      case 4:
        counts.thursday++;
        break;
      case 5:
        counts.friday++;
        break;
      case 6:
        counts.saturday++;
        break;
      case 0:
        counts.sunday++;
        break;
      default:
        break;
    }
  });

  return counts;
}
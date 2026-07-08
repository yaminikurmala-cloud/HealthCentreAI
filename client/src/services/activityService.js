import { getPatients } from "./patientService";
import { getDoctors } from "./doctorService";
import { getMedicines } from "./medicineService";
import { getTests } from "./testService";

export async function getRecentActivities() {
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

  const activities = [];

  // Recent Patients
  patients
    .sort((a, b) => b.admittedDate.localeCompare(a.admittedDate))
    .slice(0, 3)
    .forEach((patient) => {
      activities.push({
        type: "patient",
        title: "New Patient Registered",
        description: `${patient.fullName} admitted`,
        phcName: patient.phcName,
        date: patient.admittedDate,
      });
    });

  // Doctors
  doctors
    .slice(0, 2)
    .forEach((doctor) => {
      activities.push({
        type: "doctor",
        title: "Doctor Assigned",
        description: `${doctor.name} assigned`,
        phcName: doctor.phcName,
        date: "Today",
      });
    });

  // Critical Medicines
  medicines
    .filter((m) => m.status === "Critical")
    .slice(0, 2)
    .forEach((medicine) => {
      activities.push({
        type: "medicine",
        title: "Critical Medicine Alert",
        description: `${medicine.name} stock is critically low`,
        phcName: medicine.phcName,
        date: "Today",
      });
    });

  // Test Audits
  tests
    .slice(0, 2)
    .forEach((test) => {
      activities.push({
        type: "test",
        title: "Diagnostic Audit Completed",
        description: `Diagnostic facilities updated`,
        phcName: test.phcName,
        date: test.lastAudit,
      });
    });

  return activities.sort((a, b) => {
    if (a.date === "Today") return -1;
    if (b.date === "Today") return 1;

    return (b.date || "").localeCompare(a.date || "");
  });
}
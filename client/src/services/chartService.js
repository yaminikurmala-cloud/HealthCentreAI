import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getPatientChartData() {
  try {
    const docRef = doc(db, "patientChart", "weekly");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;
  } catch (error) {
    console.error("Chart Error:", error);
    return null;
  }
}
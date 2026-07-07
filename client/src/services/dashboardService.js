import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getDashboardData() {
  try {
    const docRef = doc(db, "dashboard", "overview");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;
  } catch (error) {
    console.error("Firestore Error:", error);
    return null;
  }
}
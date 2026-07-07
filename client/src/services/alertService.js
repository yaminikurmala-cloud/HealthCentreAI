import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getAlerts() {
  try {
    const querySnapshot = await getDocs(collection(db, "alerts"));

    const alerts = [];

    querySnapshot.forEach((doc) => {
      alerts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return alerts;
  } catch (error) {
    console.error("Alert Error:", error);
    return [];
  }
}
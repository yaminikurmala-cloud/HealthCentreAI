import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getLowStockMedicines() {
  try {
    const querySnapshot = await getDocs(collection(db, "medicines"));

    const medicines = [];

    querySnapshot.forEach((doc) => {
      medicines.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return medicines;
  } catch (error) {
    console.error("Low Stock Error:", error);
    return [];
  }
}
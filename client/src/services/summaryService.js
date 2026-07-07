import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getSummary() {
  try {
    const docRef = doc(db, "dashboard", "summary");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
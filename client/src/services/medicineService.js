import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

const medicinesRef = collection(db, "medicines");

export async function getMedicines() {
  const snapshot = await getDocs(medicinesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addMedicine(data) {
  return addDoc(medicinesRef, data);
}

export async function updateMedicine(id, data) {
  return updateDoc(doc(db, "medicines", id), data);
}

export async function deleteMedicine(id) {
  return deleteDoc(doc(db, "medicines", id));
}
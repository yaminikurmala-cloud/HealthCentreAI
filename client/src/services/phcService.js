import {
  collection,
 getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const phcsRef = collection(db, "phcs");

// Get all PHCs
export async function getPHCs() {
  const snapshot = await getDocs(phcsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Add PHC
export async function addPHC(data) {
  return addDoc(phcsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// Update PHC
export async function updatePHC(id, data) {
  return updateDoc(doc(db, "phcs", id), data);
}

// Delete PHC
export async function deletePHC(id) {
  return deleteDoc(doc(db, "phcs", id));
}
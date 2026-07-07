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

const doctorsRef = collection(db, "doctors");

export async function getDoctors() {
  const snapshot = await getDocs(doctorsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addDoctor(data) {
  return addDoc(doctorsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateDoctor(id, data) {
  return updateDoc(doc(db, "doctors", id), data);
}

export async function deleteDoctor(id) {
  return deleteDoc(doc(db, "doctors", id));
}
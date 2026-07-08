import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

const testsRef = collection(db, "tests");

export async function getTests() {
  const snapshot = await getDocs(testsRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("ALL TEST DOCUMENTS");
  console.log(JSON.stringify(data, null, 2));

  return data;
}

export async function addTest(data) {
  return await addDoc(testsRef, data);
}

export async function updateTest(id, data) {
  const docRef = doc(db, "tests", id);

  return await updateDoc(docRef, data);
}

export async function deleteTest(id) {
  const docRef = doc(db, "tests", id);

  return await deleteDoc(docRef);
}
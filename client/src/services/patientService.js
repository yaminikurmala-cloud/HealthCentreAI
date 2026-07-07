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

const patientsRef = collection(db, "patients");

/**
 * Fetch all patients
 */
export const getPatients = async () => {
  try {
    const snapshot = await getDocs(patientsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

/**
 * Add a new patient
 */
export const addPatient = async (patientData) => {
  try {
    await addDoc(patientsRef, {
      ...patientData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error;
  }
};

/**
 * Update an existing patient
 */
export const updatePatient = async (patientId, updatedData) => {
  try {
    const patientDoc = doc(db, "patients", patientId);

    await updateDoc(patientDoc, updatedData);
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

/**
 * Delete a patient
 */
export const deletePatient = async (patientId) => {
  try {
    const patientDoc = doc(db, "patients", patientId);

    await deleteDoc(patientDoc);
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};
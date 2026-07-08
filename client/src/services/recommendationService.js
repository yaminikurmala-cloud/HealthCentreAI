import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function applyRecommendation(phc, recommendation) {
  try {
    switch (recommendation.type) {

      // -----------------------------
      // Deploy Doctor
      // -----------------------------
      case "doctor": {
        const doctors = await getDocs(
          collection(db, "doctors")
        );

        const availableDoctor = doctors.docs.find((d) => {
          const data = d.data();

          return (
            data.phcName !== phc &&
            data.status === "Available"
          );
        });

        if (availableDoctor) {
          await updateDoc(
            doc(db, "doctors", availableDoctor.id),
            {
              phcName: phc,
            }
          );

          await createActivity(
            "Doctor deployed",
            `${availableDoctor.data().name} deployed to ${phc}`,
            phc,
            "doctor"
          );
        }

        break;
      }

      // -----------------------------
      // Medicine
      // -----------------------------
      case "medicine": {
        const medicines = await getDocs(
          collection(db, "medicines")
        );

        medicines.docs.forEach(async (medicine) => {
          const data = medicine.data();

          if (
            data.phcName === phc &&
            (
              data.status === "Critical" ||
              data.status === "Warning"
            )
          ) {
            await updateDoc(
              doc(db, "medicines", medicine.id),
              {
                stock: Number(data.stock) + 100,
                status: "Healthy",
              }
            );
          }
        });

        await createActivity(
          "Medicine stock replenished",
          `AI replenished medicine stock at ${phc}`,
          phc,
          "medicine"
        );

        break;
      }

      // -----------------------------
      // Beds
      // -----------------------------
      case "beds": {
        const phcs = await getDocs(
          collection(db, "phcs")
        );

        const current = phcs.docs.find(
          (d) => d.data().name === phc
        );

        if (current) {
          const data = current.data();

          await updateDoc(
            doc(db, "phcs", current.id),
            {
              totalBeds:
                Number(data.totalBeds || 0) + 5,
            }
          );
        }

        await createActivity(
          "Bed capacity increased",
          `Added 5 beds at ${phc}`,
          phc,
          "beds"
        );

        break;
      }

      // -----------------------------
      // Tests
      // -----------------------------
      case "tests": {
        await createActivity(
          "Diagnostics upgraded",
          `AI recommended additional diagnostic facilities for ${phc}`,
          phc,
          "tests"
        );

        break;
      }

      default:
        break;
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
}

async function createActivity(
  title,
  description,
  phcName,
  type
) {
  await addDoc(
    collection(db, "activityLogs"),
    {
      titleKey: title,
      descriptionKey: description,
      phcName,
      priority: "medium",
      type,
    }
  );
}
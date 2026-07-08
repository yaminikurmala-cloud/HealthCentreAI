import { getMedicines } from "./medicineService";

export async function getStockPredictions() {
  const medicines = await getMedicines();

  const predictions = medicines.map((medicine) => {

    const stock = Number(medicine.stock || 0);

    const required = Number(
      medicine.required || medicine.minimumStock || 100
    );

    // -----------------------------
    // AI Daily Consumption Estimate
    // -----------------------------

    let averageDailyConsumption;

    if (medicine.averageDailyConsumption) {
      averageDailyConsumption = Number(
        medicine.averageDailyConsumption
      );
    } else {

      const shortage = Math.max(required - stock, 0);

      averageDailyConsumption =
        shortage > 0
          ? Math.max(1, Math.round(shortage / 7))
          : Math.max(1, Math.round(required * 0.02));
    }

    // -----------------------------
    // Days Left
    // -----------------------------

    const daysLeft = Math.max(
      0,
      Math.round(stock / averageDailyConsumption)
    );

    // -----------------------------
    // AI Status
    // -----------------------------

    let status = "healthy";

    if (daysLeft <= 30) status = "low";
    if (daysLeft <= 15) status = "warning";
    if (daysLeft <= 7) status = "critical";

    // -----------------------------
    // Priority
    // -----------------------------

    let priority = "low";

    if (status === "warning")
      priority = "medium";

    if (status === "critical")
      priority = "high";

    // -----------------------------
    // Reorder Quantity
    // -----------------------------

    const reorderQuantity = Math.max(
      required - stock,
      0
    );

    // -----------------------------
    // AI Recommendations
    // -----------------------------

    const recommendations = [];

    if (status === "critical") {

      const donor = medicines.find(
        (m) =>
          m.name === medicine.name &&
          m.phcName !== medicine.phcName &&
          Number(m.stock) >
            Number(m.required || 100)
      );

      if (donor) {

        recommendations.push({
          type: "transfer",
          units: Math.min(
            reorderQuantity,
            Math.floor(
              (Number(donor.stock) -
                Number(donor.required || 100)) / 2
            )
          ),
          from: donor.phcName,
        });

      } else {

        recommendations.push({
          type: "order",
          units: reorderQuantity,
        });

      }
    }

    else if (status === "warning") {

      recommendations.push({
        type: "order",
        units: reorderQuantity,
      });

    }

    if (daysLeft <= 5) {

      recommendations.push({
        type: "notify",
      });

    }

    if (recommendations.length === 0) {

      recommendations.push({
        type: "healthy",
      });

    }

    return {
      ...medicine,

      averageDailyConsumption,

      daysLeft,

      status,

      priority,

      reorderQuantity,

      recommendations,
    };
  });

  return predictions.sort(
    (a, b) => a.daysLeft - b.daysLeft
  );
}
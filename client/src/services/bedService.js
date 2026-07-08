import { getPHCs } from "./phcService";

export async function getBedAvailability() {
  const phcs = await getPHCs();

  return phcs.map((phc) => {
    const totalBeds = Number(phc.totalBeds || 0);

    const occupiedBeds = Number(
      phc.occupiedBeds || 0
    );

    const availableBeds =
      totalBeds - occupiedBeds;

    const occupancy =
      totalBeds === 0
        ? 0
        : Math.round(
            (occupiedBeds / totalBeds) * 100
          );

    let status = "healthy";

    if (occupancy >= 90)
      status = "critical";
    else if (occupancy >= 70)
      status = "warning";

    return {
      ...phc,
      totalBeds,
      occupiedBeds,
      availableBeds,
      occupancy,
      status,
    };
  });
}
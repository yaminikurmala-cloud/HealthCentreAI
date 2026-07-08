import { getPHCs } from "./phcService";
import { getResourceAllocation } from "./resourceAllocationService";

export async function getDashboardHeaderData() {
  const [phcs, resources] = await Promise.all([
    getPHCs(),
    getResourceAllocation(),
  ]);

  const averageScore =
    resources.reduce(
      (sum, item) => sum + item.healthScore,
      0
    ) / resources.length;

  const score = Math.round(averageScore);

  let status = "Stable";

  if (score < 60) {
    status = "Critical";
  } else if (score < 80) {
    status = "Needs Attention";
  }

  return {
    phcs,
    score,
    status,
  };
}
import { getResourceAllocation } from "./resourceAllocationService";

export async function getTopRecommendations() {
  const resources = await getResourceAllocation();

  return resources
    .filter((phc) => phc.priority !== "Low")
    .sort((a, b) => {
      const order = {
        Critical: 0,
        Medium: 1,
        Low: 2,
      };

      return order[a.priority] - order[b.priority];
    })
    .slice(0, 3);
}
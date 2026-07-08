import { getPatients } from "./patientService";

export async function getOutbreakData() {
  const patients = await getPatients();

  const grouped = {};

  patients.forEach((patient) => {
    const phc = patient.phcName || "Unknown PHC";
    const disease =
      patient.diagnosis ||
      patient.disease ||
      "General";

    const key = `${phc}-${disease}`;

    if (!grouped[key]) {
      grouped[key] = {
        phcName: phc,
        disease,
        currentCases: 0,
      };
    }

    grouped[key].currentCases++;
  });

  return Object.values(grouped).map((item) => {
    // Simple AI baseline
    const normalAverage = 5;

    const increase =
      ((item.currentCases - normalAverage) /
        normalAverage) *
      100;

    let risk = "Low";
    let confidence = 70;

    if (increase >= 200) {
      risk = "High";
      confidence = 95;
    } else if (increase >= 50) {
      risk = "Medium";
      confidence = 85;
    }

    let recommendation = "Monitor";

    if (risk === "High") {
      recommendation =
        "Deploy medical team immediately";
    } else if (risk === "Medium") {
      recommendation =
        "Increase surveillance";
    }

    return {
      ...item,
      normalAverage,
      increase: Math.max(
        0,
        Math.round(increase)
      ),
      risk,
      confidence,
      recommendation,
      explanation: `Current cases (${item.currentCases}) are ${Math.max(
        0,
        Math.round(increase)
      )}% higher than the normal average (${normalAverage}).`,
    };
  });
}

export async function getOutbreakStats() {
  const data = await getOutbreakData();

  return {
    alerts: data.filter(
      (d) => d.risk === "High"
    ).length,

    highRisk: data.filter(
      (d) => d.risk === "High"
    ).length,

    diseases: new Set(
      data.map((d) => d.disease)
    ).size,

    confidence:
      data.length === 0
        ? 0
        : Math.round(
            data.reduce(
              (sum, item) =>
                sum + item.confidence,
              0
            ) / data.length
          ),
  };
}
import { ShieldAlert } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function AIOutbreakAlert({ outbreaks }) {
  const { t } = useLanguage();

  const highest =
    outbreaks.find((o) => o.risk === "High") ||
    outbreaks.find((o) => o.risk === "Medium");

  if (!highest) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-green-700">
          {t.noOutbreakDetected}
        </h2>

        <p className="text-green-600 mt-2">
          {t.noOutbreakDesc}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

      <div className="flex gap-4">

        <ShieldAlert
          size={42}
          className="text-red-600"
        />

        <div>

          <h2 className="text-2xl font-bold text-red-700">
            {t.possibleOutbreak}
          </h2>

          <p className="mt-2">
            <strong>{t.phc}:</strong> {highest.phcName}
          </p>

          <p>
            <strong>{t.disease}:</strong> {highest.disease}
          </p>

          <p>
            <strong>{t.confidence}:</strong>{" "}
            {highest.confidence}%
          </p>

          <p className="mt-3 text-slate-700">
            {highest.explanation}
          </p>

          <div className="mt-4 bg-white rounded-xl p-4">

            <h3 className="font-semibold mb-2">
              {t.aiRecommendation}
            </h3>

            <ul className="list-disc ml-5 space-y-1 text-sm">

              <li>{t.deployMedicalTeam}</li>

              <li>{t.increaseMedicineStock}</li>

              <li>{t.notifyDistrictOfficer}</li>

              <li>{t.startVillageScreening}</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIOutbreakAlert;
import Layout from "../components/layout/Layout";
import { Bot, Sparkles, Activity, Pill, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function AIAssistant() {
  const { t } = useLanguage();

  const recommendations = [
    {
      icon: Activity,
      title: t.criticalPatients,
      description: t.criticalPatientsDesc,
    },
    {
      icon: Pill,
      title: t.medicineInventory,
      description: t.medicineInventoryDesc,
    },
    {
      icon: Users,
      title: t.phcPerformance,
      description: t.phcPerformanceDesc,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            {t.aiHealthcareAssistant}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.aiHealthcareAssistantDesc}
          </p>

        </div>

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">

          <div className="flex items-center gap-4">

            <Bot size={50} />

            <div>

              <h2 className="text-3xl font-bold">
                {t.aiDecisionEngine}
              </h2>

              <p className="mt-2 opacity-90">
                {t.aiDecisionEngineDesc}
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-6">

          {recommendations.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <Icon
                  className="text-teal-600 mb-4"
                  size={34}
                />

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-3">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              {t.aiSuggestions}
            </h2>

          </div>

          <ul className="space-y-4 text-gray-600 list-disc pl-6">

            <li>{t.aiSuggestion1}</li>

            <li>{t.aiSuggestion2}</li>

            <li>{t.aiSuggestion3}</li>

          </ul>

        </div>

      </div>
    </Layout>
  );
}

export default AIAssistant;
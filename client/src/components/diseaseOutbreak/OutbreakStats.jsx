import {
  Siren,
  ShieldAlert,
  Bug,
  BrainCircuit,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function OutbreakStats({ stats }) {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.activeAlerts,
      value: stats.alerts,
      icon: Siren,
      color: "bg-red-100 text-red-600",
    },
    {
      title: t.highRiskPHCs,
      value: stats.highRisk,
      icon: ShieldAlert,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: t.diseasesMonitored,
      value: stats.diseases,
      icon: Bug,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: t.aiConfidence,
      value: `${stats.confidence}%`,
      icon: BrainCircuit,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={26} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OutbreakStats;
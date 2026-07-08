import {
  AlertTriangle,
  TriangleAlert,
  CheckCircle2,
  ArrowRightLeft,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function StockStats({ predictions }) {
  const { t } = useLanguage();

  const critical = predictions.filter(
    (m) => m.status === "critical"
  ).length;

  const warning = predictions.filter(
    (m) => m.status === "warning"
  ).length;

  const healthy = predictions.filter(
    (m) => m.status === "healthy"
  ).length;

  const transfer = predictions.filter((m) =>
    m.recommendations?.some(
      (r) => r.type === "transfer"
    )
  ).length;

  const cards = [
    {
      title: t.criticalMedicines,
      value: critical,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-700",
    },
    {
      title: t.warningMedicines,
      value: warning,
      icon: TriangleAlert,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: t.healthyMedicines,
      value: healthy,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t.transferRequired,
      value: transfer,
      icon: ArrowRightLeft,
      color: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
            >
              <Icon size={22} />
            </div>

            <h3 className="text-gray-500 mt-5">
              {card.title}
            </h3>

            <p className="text-4xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default StockStats;
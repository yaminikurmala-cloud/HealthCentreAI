import {
  Pill,
  Package,
  AlertTriangle,
  CircleCheck,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function MedicineStats({ medicines }) {
  const { t } = useLanguage();

  const total = medicines.length;

  const critical = medicines.filter(
    (medicine) => medicine.status?.toLowerCase() === "critical"
  ).length;

  const low = medicines.filter(
    (medicine) => medicine.status?.toLowerCase() === "low"
  ).length;

  const available = medicines.filter(
    (medicine) => medicine.status?.toLowerCase() === "available"
  ).length;

  const cards = [
    {
      title: t.totalMedicines,
      value: total,
      icon: Pill,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.available,
      value: available,
      icon: CircleCheck,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t.lowStock,
      value: low,
      icon: Package,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: t.critical,
      value: critical,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-700",
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

export default MedicineStats;
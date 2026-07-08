import {
  Bed,
  BedDouble,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function BedStats({ beds }) {
  const { t } = useLanguage();

  const totalBeds = beds.reduce(
    (sum, phc) => sum + phc.totalBeds,
    0
  );

  const occupiedBeds = beds.reduce(
    (sum, phc) => sum + phc.occupiedBeds,
    0
  );

  const availableBeds = beds.reduce(
    (sum, phc) => sum + phc.availableBeds,
    0
  );

  const criticalPHCs = beds.filter(
    (phc) => phc.status === "critical"
  ).length;

  const cards = [
    {
      title: t.totalBeds,
      value: totalBeds,
      icon: Bed,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.occupiedBeds,
      value: occupiedBeds,
      icon: BedDouble,
      color: "bg-red-100 text-red-700",
    },
    {
      title: t.availableBeds,
      value: availableBeds,
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t.criticalPHCs,
      value: criticalPHCs,
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-700",
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
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BedStats;
import {
  ShieldAlert,
  UserPlus,
  Bed,
  Pill,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function ResourceStats({ resources }) {
  const { t } = useLanguage();

  const criticalPHCs = resources.filter(
    (r) => r.priority === "Critical"
  ).length;

  const doctorsNeeded = resources.filter(
    (r) => r.patientsPerDoctor > 20
  ).length;

  const bedsNeeded = resources.filter(
    (r) => r.availableBeds < 5
  ).length;

  const medicineShortages = resources.reduce(
    (sum, r) => sum + r.medicineShortage,
    0
  );

  const cards = [
    {
      title: t.criticalPHCs,
      value: criticalPHCs,
      icon: ShieldAlert,
      color: "bg-red-100 text-red-700",
    },
    {
      title: t.doctorsNeeded,
      value: doctorsNeeded,
      icon: UserPlus,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.bedsNeeded,
      value: bedsNeeded,
      icon: Bed,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: t.medicineShortages,
      value: medicineShortages,
      icon: Pill,
      color: "bg-green-100 text-green-700",
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

export default ResourceStats;
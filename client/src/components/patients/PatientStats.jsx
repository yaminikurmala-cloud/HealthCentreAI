import {
  Users,
  UserCheck,
  UserRound,
  TriangleAlert,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function PatientStats({ patients }) {
  const { t } = useLanguage();

  const total = patients.length;

  const male = patients.filter(
    (p) => p.gender?.toLowerCase() === "male"
  ).length;

  const female = patients.filter(
    (p) => p.gender?.toLowerCase() === "female"
  ).length;

  const critical = patients.filter(
    (p) => p.status?.toLowerCase() === "critical"
  ).length;

  const cards = [
    {
      title: t.totalPatients,
      value: total,
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.male,
      value: male,
      icon: UserCheck,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      title: t.female,
      value: female,
      icon: UserRound,
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: t.critical,
      value: critical,
      icon: TriangleAlert,
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

export default PatientStats;
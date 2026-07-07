import {
  Building2,
  CircleCheck,
  Users,
  UserRound,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function PHCStats({ phcs }) {
  const { t } = useLanguage();

  const totalPHCs = phcs.length;

  const activePHCs = phcs.filter(
    (phc) => phc.status?.toLowerCase() === "active"
  ).length;

  const totalDoctors = phcs.reduce(
    (sum, phc) => sum + Number(phc.doctorCount || 0),
    0
  );

  const totalPatients = phcs.reduce(
    (sum, phc) => sum + Number(phc.patientCount || 0),
    0
  );

  const cards = [
    {
      title: t.totalPHCs,
      value: totalPHCs,
      icon: Building2,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.activePHCs,
      value: activePHCs,
      icon: CircleCheck,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t.totalDoctors,
      value: totalDoctors,
      icon: Users,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: t.totalPatients,
      value: totalPatients,
      icon: UserRound,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

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

export default PHCStats;
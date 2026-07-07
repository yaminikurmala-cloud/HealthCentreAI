import {
  Stethoscope,
  UserCheck,
  UserCog,
  Building2,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function DoctorStats({ doctors }) {
  const { t } = useLanguage();

  const total = doctors.length;

  const available = doctors.filter(
    (doctor) => doctor.status?.toLowerCase() === "available"
  ).length;

  const onLeave = doctors.filter(
    (doctor) => doctor.status?.toLowerCase() === "on leave"
  ).length;

  const specializations = new Set(
    doctors.map((doctor) => doctor.specialization)
  ).size;

  const cards = [
    {
      title: t.totalDoctors,
      value: total,
      icon: Stethoscope,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.available,
      value: available,
      icon: UserCheck,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t.onLeave,
      value: onLeave,
      icon: UserCog,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: t.specializations,
      value: specializations,
      icon: Building2,
      color: "bg-purple-100 text-purple-700",
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

export default DoctorStats;
import {
  Building2,
  FlaskConical,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function TestStats({ tests }) {
  const { t } = useLanguage();

  const totalPHCs = tests.length;

  const testFields = [
    "bloodPressure",
    "bloodSugar",
    "cbc",
    "malaria",
    "dengue",
    "urine",
    "pregnancy",
    "ecg",
    "xray",
    "ultrasound",
  ];

  const totalTestsAvailable = tests.reduce((sum, phc) => {
    return (
      sum +
      testFields.filter((field) => phc[field] === true).length
    );
  }, 0);

  const fullyEquipped = tests.filter((phc) =>
    testFields.every((field) => phc[field] === true)
  ).length;

  const needUpgrade = totalPHCs - fullyEquipped;

  const cards = [
    {
      title: t.totalPHCs,
      value: totalPHCs,
      icon: Building2,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t.testsAvailable,
      value: totalTestsAvailable,
      icon: FlaskConical,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t.fullyEquipped,
      value: fullyEquipped,
      icon: CircleCheck,
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: t.needUpgrade,
      value: needUpgrade,
      icon: TriangleAlert,
      color: "bg-red-100 text-red-700",
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

export default TestStats;
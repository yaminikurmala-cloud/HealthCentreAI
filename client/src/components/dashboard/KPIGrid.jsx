import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import { useLanguage } from "../../context/LanguageContext";

import {
  Users,
  Pill,
  Bed,
  Stethoscope,
  FlaskConical,
  Ambulance,
} from "lucide-react";

import KPICard from "./KPICard";
import SkeletonCard from "../SkeletonCard";

function KPIGrid() {
  const { t } = useLanguage();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getDashboardData();

      if (data) {
        setDashboardData(data);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const cards = [
    {
      title: t.patientsToday,
      value: dashboardData?.patientsToday,
      icon: Users,
      trend: t.trendPatients,
      trendType: "up",
      goodWhenUp: true,
    },
    {
      title: t.medicineItems,
      value: dashboardData?.medicineItems,
      icon: Pill,
      trend: t.trendMedicines,
      trendType: "up",
      goodWhenUp: true,
    },
    {
      title: t.availableBeds,
      value: dashboardData?.availableBeds,
      icon: Bed,
      trend: t.trendBeds,
      trendType: "up",
      goodWhenUp: true,
    },
    {
      title: t.doctorsOnDuty,
      value: dashboardData?.doctorsOnDuty,
      icon: Stethoscope,
      trend: t.noChange,
      trendType: "same",
      goodWhenUp: true,
    },
    {
      title: t.testsAvailable,
      value: dashboardData?.testsAvailable,
      icon: FlaskConical,
      trend: t.trendTests,
      trendType: "up",
      goodWhenUp: true,
    },
    {
      title: t.emergencyCases,
      value: dashboardData?.emergencyCases,
      icon: Ambulance,
      trend: t.trendEmergency,
      trendType: "up",
      goodWhenUp: false,
    },
  ];

  if (loading) {
    return (
      <section className="grid grid-cols-3 gap-6 mt-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-6 mt-8">
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </section>
  );
}

export default KPIGrid;
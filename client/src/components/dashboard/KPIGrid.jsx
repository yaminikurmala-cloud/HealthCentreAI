import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { usePHC } from "../../context/PHCContext";

import { getDashboardData } from "../../services/dashboardService";

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
  const { selectedPHC } = usePHC();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [selectedPHC]);

  async function loadDashboard() {
    setLoading(true);

    const data = await getDashboardData(selectedPHC);

    setDashboardData(data);

    setLoading(false);
  }

  const cards = [
    {
      title: t.patientsToday,
      value: dashboardData?.patientsToday || 0,
      icon: Users,
   
    },
    {
      title: t.medicineItems,
      value: dashboardData?.medicineItems || 0,
      icon: Pill,
      
    },
    {
      title: t.availableBeds,
      value: dashboardData?.availableBeds || 0,
      icon: Bed,
     
    },
    {
      title: t.doctorsOnDuty,
      value: dashboardData?.doctorsOnDuty || 0,
      icon: Stethoscope,
      
    },
    {
      title: t.testsAvailable,
      value: dashboardData?.testsAvailable || 0,
      icon: FlaskConical,
   
    },
    {
      title: t.emergencyCases,
      value: dashboardData?.emergencyCases || 0,
      icon: Ambulance,
    
    },
  ];

  if (loading) {
    return (
      <section className="grid grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
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
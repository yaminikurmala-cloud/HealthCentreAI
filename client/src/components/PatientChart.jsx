import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getPatientChartData } from "../services/chartService";
import { useLanguage } from "../context/LanguageContext";
import { usePHC } from "../context/PHCContext";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function PatientChart() {
  const { t, language } = useLanguage();
  const { selectedPHC } = usePHC();

  const dayNames = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    te: ["సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని", "ఆది"],
    hi: ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"],
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadChart() {
      const chartData = await getPatientChartData(selectedPHC);

      if (!chartData) return;

      const days = dayNames[language];

      setData([
        { day: days[0], patients: chartData.monday },
        { day: days[1], patients: chartData.tuesday },
        { day: days[2], patients: chartData.wednesday },
        { day: days[3], patients: chartData.thursday },
        { day: days[4], patients: chartData.friday },
        { day: days[5], patients: chartData.saturday },
        { day: days[6], patients: chartData.sunday },
      ]);
    }

    loadChart();
  }, [language, selectedPHC]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[360px]"
    >
      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {t.patientFootfall}
          </h2>

          <p className="text-sm text-slate-500">
            {selectedPHC === "All PHCs"
              ? "All PHCs • Last 7 Days"
              : `${selectedPHC} • Last 7 Days`}
          </p>

        </div>

      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="patientFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#0F766E"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#0F766E"
                stopOpacity={0.03}
              />
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="patients"
            stroke="#0F766E"
            strokeWidth={3}
            fill="url(#patientFill)"
            animationDuration={1200}
          />

        </AreaChart>
      </ResponsiveContainer>

    </motion.div>
  );
}

export default PatientChart;
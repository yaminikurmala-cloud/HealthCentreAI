import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import OutbreakStats from "../components/diseaseOutbreak/OutbreakStats";
import OutbreakTable from "../components/diseaseOutbreak/OutbreakTable";
import AIOutbreakAlert from "../components/diseaseOutbreak/AIOutbreakAlert";

import { useLanguage } from "../context/LanguageContext";

import {
  getOutbreakData,
  getOutbreakStats,
} from "../services/outbreakService";

function DiseaseOutbreak() {
  const { t } = useLanguage();

  const [stats, setStats] = useState({
    alerts: 0,
    highRisk: 0,
    diseases: 0,
    confidence: 0,
  });

  const [outbreaks, setOutbreaks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const [table, summary] =
      await Promise.all([
        getOutbreakData(),
        getOutbreakStats(),
      ]);

    setOutbreaks(table);
    setStats(summary);

    setLoading(false);
  }

  return (
    <Layout>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            {t.diseaseOutbreak}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.diseaseOutbreakDesc}
          </p>

        </div>

        <OutbreakStats stats={stats} />

        <AIOutbreakAlert
          outbreaks={outbreaks}
        />

        <OutbreakTable
          outbreaks={outbreaks}
          loading={loading}
        />

      </div>

    </Layout>
  );
}

export default DiseaseOutbreak;
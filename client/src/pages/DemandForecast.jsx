import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import ForecastCard from "../components/ai/ForecastCard";

import { useLanguage } from "../context/LanguageContext";

import { getDemandForecast } from "../services/forecastService";

function DemandForecast() {
  const { t } = useLanguage();

  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForecast();
  }, []);

  async function loadForecast() {
    try {
      setLoading(true);

      const data = await getDemandForecast();

      setForecast(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">
            {t.loadingForecast}
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            {t.aiDemandForecast}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.aiDemandForecastDesc}
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {forecast.map((item) => (

            <ForecastCard
              key={item.phc}
              forecast={item}
            />

          ))}

        </div>

      </div>

    </Layout>
  );
}

export default DemandForecast;
import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import ForecastCard from "../components/ai/ForecastCard";

import { Bot, BrainCircuit, Activity } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

import { getDemandForecast } from "../services/forecastService";

function AIAssistant() {
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

  const healthy = forecast.filter(
    (p) => p.status === "healthy"
  ).length;

  const attention = forecast.filter(
    (p) => p.status === "needs_attention"
  ).length;

  const critical = forecast.filter(
    (p) => p.status === "critical"
  ).length;

  return (
    <Layout>
      <div className="space-y-8">

        {/* Heading */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            🤖 AI District Decision Center
          </h1>

          <p className="text-slate-500 mt-2">
            AI-powered forecasting, healthcare intelligence and district intervention recommendations.
          </p>

        </div>

        {/* Banner */}

        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 rounded-3xl p-8 text-white shadow-lg">

          <div className="flex items-center gap-5">

            <Bot size={60} />

            <div>

              <h2 className="text-3xl font-bold">
                AI Healthcare Intelligence Engine
              </h2>

              <p className="mt-2 opacity-90">
                Predict patient demand, identify underperforming PHCs,
                monitor medicine shortages and recommend district-level interventions.
              </p>

            </div>

          </div>

        </div>

        {/* District Summary */}

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <BrainCircuit
              className="text-green-600 mb-4"
              size={34}
            />

            <p className="text-gray-500">
              Healthy PHCs
            </p>

            <h2 className="text-4xl font-bold">
              {healthy}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <Activity
              className="text-yellow-500 mb-4"
              size={34}
            />

            <p className="text-gray-500">
              Needs Attention
            </p>

            <h2 className="text-4xl font-bold">
              {attention}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <Bot
              className="text-red-600 mb-4"
              size={34}
            />

            <p className="text-gray-500">
              Critical PHCs
            </p>

            <h2 className="text-4xl font-bold">
              {critical}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <BrainCircuit
              className="text-teal-600 mb-4"
              size={34}
            />

            <p className="text-gray-500">
              Total PHCs Analysed
            </p>

            <h2 className="text-4xl font-bold">
              {forecast.length}
            </h2>

          </div>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="animate-pulse">

              <Bot
                className="mx-auto text-teal-600 mb-4"
                size={60}
              />

              <h2 className="text-2xl font-bold">
                AI is analysing district healthcare...
              </h2>

            </div>

          </div>

        ) : (

          <div>

            <h2 className="text-3xl font-bold mb-6">
              AI Forecast by PHC
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {forecast.map((item) => (

                <ForecastCard
                  key={item.phc}
                  forecast={item}
                />

              ))}

            </div>

          </div>

        )}

      </div>
    </Layout>
  );
}

export default AIAssistant;
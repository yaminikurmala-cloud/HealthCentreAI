import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import StockStats from "../components/stockPrediction/StockStats";
import StockPredictionTable from "../components/stockPrediction/StockPredictionTable";

import { useLanguage } from "../context/LanguageContext";

import { getStockPredictions } from "../services/stockPredictionService";

function StockPrediction() {
  const { t } = useLanguage();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPredictions();
  }, []);

  async function loadPredictions() {
    try {
      setLoading(true);

      const data = await getStockPredictions();

      setPredictions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">

        {/* Page Header */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            {t.stockPrediction}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.stockPredictionDesc}
          </p>

        </div>

        {/* Summary Cards */}

        <StockStats predictions={predictions} />

        {/* Prediction Table */}

        <StockPredictionTable
          predictions={predictions}
          loading={loading}
        />

      </div>
    </Layout>
  );
}

export default StockPrediction;
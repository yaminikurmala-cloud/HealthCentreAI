import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import BedStats from "../components/beds/BedStats";
import BedTable from "../components/beds/BedTable";

import { useLanguage } from "../context/LanguageContext";

import { getBedAvailability } from "../services/bedService";

function BedAvailability() {
  const { t } = useLanguage();

  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBeds();
  }, []);

  async function loadBeds() {
    try {
      setLoading(true);

      const data = await getBedAvailability();

      setBeds(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            {t.bedAvailability}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.bedAvailabilityDesc}
          </p>

        </div>

        <BedStats beds={beds} />

        <BedTable
          beds={beds}
          loading={loading}
        />

      </div>

    </Layout>
  );
}

export default BedAvailability;
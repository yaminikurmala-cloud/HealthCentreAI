import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import ResourceStats from "../components/resourceAllocation/ResourceStats";
import ResourceTable from "../components/resourceAllocation/ResourceTable";

import { useLanguage } from "../context/LanguageContext";

import { getResourceAllocation } from "../services/resourceAllocationService";

function ResourceAllocation() {
  const { t } = useLanguage();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      setLoading(true);

      const data = await getResourceAllocation();

      setResources(data);
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
            {t.resourceAllocation}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.resourceAllocationDesc}
          </p>

        </div>

        <ResourceStats resources={resources} />

        <ResourceTable
          resources={resources}
          loading={loading}
        />

      </div>

    </Layout>
  );
}

export default ResourceAllocation;
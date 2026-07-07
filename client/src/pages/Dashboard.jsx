import Layout from "../components/layout/Layout";

import CommandCenterBanner from "../components/CommandCenterBanner";

import KPIGrid from "../components/dashboard/KPIGrid";
import PatientChart from "../components/PatientChart";
import AIAlerts from "../components/AIAlerts";
import LowStock from "../components/LowStock";
import PHCTable from "../components/PHCTable";
import RecentActivity from "../components/RecentActivity";

function Dashboard() {
  return (
    <Layout>
      {/* Command Center Banner */}

      <CommandCenterBanner />

      {/* KPI Cards */}

      <KPIGrid />

      {/* Analytics */}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <PatientChart />
        </div>

        <div className="col-span-4">
          <AIAlerts />
        </div>

        <div className="col-span-3">
          <LowStock />
        </div>
      </div>

      {/* District */}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <PHCTable />
        </div>

        <div className="col-span-4">
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
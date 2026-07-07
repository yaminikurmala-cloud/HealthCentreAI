import { Users } from "lucide-react";

function KPICards() {
  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-icon">
          <Users size={24} />
        </div>

        <h2>1,248</h2>

        <h4>Patients Today</h4>

        <p>+12.5% vs yesterday</p>
      </div>
    </div>
  );
}

export default KPICards;
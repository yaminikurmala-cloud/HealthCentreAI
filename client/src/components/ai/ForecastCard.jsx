import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  HeartPulse,
  Users,
  Pill,
  FlaskConical,
  ShieldAlert,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

function ForecastCard({ forecast }) {
  const { t } = useLanguage();

  const {
    phc,
    patientCount,
    forecastPatients,
    growthPercent,
    doctorCount,
    patientsPerDoctor,
    lowMedicines,
    criticalMedicines,
    availableTests,
    demandIndex,
    healthScore,
    priority,
    status,
    recommendations,
  } = forecast;

  function getStatusColor() {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700";

      case "needs_attention":
        return "bg-yellow-100 text-yellow-700";

      case "critical":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  function getStatusText() {
    switch (status) {
      case "healthy":
        return t.healthy;

      case "needs_attention":
        return t.needsAttention;

      case "critical":
        return t.critical;

      default:
        return status;
    }
  }

  function getPriorityColor() {
    switch (priority) {
      case "high":
        return "text-red-600";

      case "medium":
        return "text-yellow-600";

      default:
        return "text-green-600";
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">
            {phc}
          </h2>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>

        </div>

        <Activity
          size={34}
          className="text-teal-600"
        />

      </div>

      {/* Metrics */}

      <div className="grid grid-cols-2 gap-5 mt-8">

        <div>

          <p className="text-gray-500 text-sm">
            {t.currentPatients}
          </p>

          <h3 className="text-2xl font-bold">
            {patientCount}
          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            {t.forecastPatients}
          </p>

          <h3 className="text-2xl font-bold flex items-center gap-2">

            {forecastPatients}

            <TrendingUp
              size={18}
              className="text-red-500"
            />

          </h3>

          <p className="text-xs text-red-500 mt-1">
            +{growthPercent}%
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Users size={15} />
            {t.doctors}
          </div>

          <h3 className="font-semibold mt-1">
            {doctorCount}
          </h3>

          <p className="text-xs text-gray-400">
            {patientsPerDoctor} patients/doctor
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FlaskConical size={15} />
            {t.testsAvailable}
          </div>

          <h3 className="font-semibold mt-1">
            {availableTests}/10
          </h3>

        </div>

        <div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Pill size={15} />
            {t.lowStock}
          </div>

          <h3 className="font-semibold mt-1">
            {lowMedicines}
          </h3>

          <p className="text-xs text-red-500">
            {criticalMedicines} Critical
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <HeartPulse size={15} />
            {t.healthScore}
          </div>

          <h3 className="text-2xl font-bold text-teal-700">
            {healthScore}
          </h3>

        </div>

      </div>

      {/* AI Scores */}

      <div className="grid grid-cols-2 gap-4 mt-6 border-t pt-5">

        <div>

          <p className="text-sm text-gray-500">
            Demand Index
          </p>

          <h3 className="font-bold text-xl">
            {demandIndex}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Priority
          </p>

          <h3
            className={`font-bold capitalize ${getPriorityColor()}`}
          >
            {priority}
          </h3>

        </div>

      </div>

      {/* Recommendations */}

      <div className="mt-6 border-t pt-5">

        <div className="flex items-center gap-2 mb-3">

          {status === "critical" ? (
            <AlertTriangle className="text-red-500" />
          ) : (
            <ShieldAlert className="text-yellow-500" />
          )}

          <h3 className="font-bold">
            {t.aiRecommendation}
          </h3>

        </div>

        <ul className="space-y-2">

          {recommendations.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-gray-600"
            >
              <CheckCircle
                size={16}
                className="text-green-600 mt-1"
              />

              <span>{item}</span>

            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}

export default ForecastCard;
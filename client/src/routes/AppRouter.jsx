import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Patients from "../pages/Patients";
import Medicines from "../pages/Medicines";
import Doctors from "../pages/Doctors";
import PHCs from "../pages/PHCs";
import Tests from "../pages/Tests";
import Analytics from "../pages/Analytics";
import AIAssistant from "../pages/AIAssistant";
import Settings from "../pages/Settings";

import StockPrediction from "../pages/StockPrediction";
import BedAvailability from "../pages/BedAvailability";
import ResourceAllocation from "../pages/ResourceAllocation";
import DiseaseOutbreak from "../pages/DiseaseOutbreak";
import Seeder from "../pages/Seeder";

function AppRouter() {
  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* AI Modules */}

      <Route
        path="/stock-prediction"
        element={<StockPrediction />}
      />

      <Route
        path="/bed-availability"
        element={<BedAvailability />}
      />

      <Route
        path="/resource-allocation"
        element={<ResourceAllocation />}
      />

      <Route
        path="/disease-outbreak"
        element={<DiseaseOutbreak />}
      />

      {/* Management */}

      <Route
        path="/patients"
        element={<Patients />}
      />

      <Route
        path="/medicines"
        element={<Medicines />}
      />

      <Route
        path="/doctors"
        element={<Doctors />}
      />

      <Route
        path="/phcs"
        element={<PHCs />}
      />

      <Route
        path="/tests"
        element={<Tests />}
      />

      {/* Other Pages */}

      <Route
        path="/analytics"
        element={<Analytics />}
      />

      <Route
        path="/assistant"
        element={<AIAssistant />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* Seeder */}

      <Route
        path="/seeder"
        element={<Seeder />}
      />

      {/* Redirect */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRouter;
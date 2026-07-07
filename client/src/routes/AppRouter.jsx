import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Patients from "../pages/Patients";
import Medicines from "../pages/Medicines";
import Doctors from "../pages/Doctors";
import PHCs from "../pages/PHCs";
import Analytics from "../pages/Analytics";
import AIAssistant from "../pages/AIAssistant";
import Settings from "../pages/Settings";

function AppRouter() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Sidebar Pages */}
      <Route path="/patients" element={<Patients />} />
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/phcs" element={<PHCs />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/assistant" element={<AIAssistant />} />
      <Route path="/settings" element={<Settings />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
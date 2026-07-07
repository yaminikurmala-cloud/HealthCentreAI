import Layout from "../components/layout/Layout";
import {
  Globe,
  Bell,
  ShieldCheck,
  UserCog,
  Database,
  BrainCircuit,
  Save,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

function SettingsPage() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-8">

        {/* Heading */}

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            {t.settings}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.settingsDescription}
          </p>
        </div>

        {/* First Row */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Language */}

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-3 mb-5">

              <Globe className="text-teal-600" />

              <h2 className="text-xl font-bold">
                {t.language}
              </h2>

            </div>

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="en">
                English
              </option>

              <option value="te">
                తెలుగు
              </option>

              <option value="hi">
                हिन्दी
              </option>

            </select>

          </div>

          {/* Notifications */}

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-3 mb-5">

              <Bell className="text-yellow-500" />

              <h2 className="text-xl font-bold">
                {t.notifications}
              </h2>

            </div>

            <div className="space-y-3">

              <label className="flex justify-between">
                <span>{t.medicineAlerts}</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>{t.patientAlerts}</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>{t.aiAlerts}</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>{t.emergencyAlerts}</span>
                <input type="checkbox" defaultChecked />
              </label>

            </div>

          </div>

        </div>

        {/* Second Row */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Admin */}

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-3 mb-5">

              <UserCog className="text-blue-600" />

              <h2 className="text-xl font-bold">
                {t.account}
              </h2>

            </div>

            <div className="space-y-3">

              <p>
                <strong>{t.name}:</strong> District Admin
              </p>

              <p>
                <strong>Email:</strong> admin@healthai.com
              </p>

              <p>
                <strong>{t.role}:</strong> {t.administrator}
              </p>

            </div>

          </div>

          {/* Security */}

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-3 mb-5">

              <ShieldCheck className="text-green-600" />

              <h2 className="text-xl font-bold">
                {t.security}
              </h2>

            </div>

            <p className="mb-2">
              <strong>{t.lastLogin}</strong>
            </p>

            <p className="text-slate-500">
              Today • 11:30 AM
            </p>

            <button className="mt-5 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700">
              {t.changePassword}
            </button>

          </div>

        </div>

        {/* System */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <Database className="text-purple-600" />

            <h2 className="text-xl font-bold">
              {t.systemInformation}
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p>
                <strong>{t.version}</strong>
              </p>

              <p>1.0.0</p>

            </div>

            <div>

              <p>
                <strong>Firebase</strong>
              </p>

              <p className="text-green-600">
                Connected
              </p>

            </div>

            <div>

              <p>
                <strong>{t.aiEngine}</strong>
              </p>

              <p className="text-green-600">
                Online
              </p>

            </div>

            <div>

              <p>
                <strong>{t.lastSync}</strong>
              </p>

              <p>Just Now</p>

            </div>

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl">

            <Save size={18} />

            {t.saveSettings}

          </button>

        </div>

      </div>
    </Layout>
  );
}

export default SettingsPage;
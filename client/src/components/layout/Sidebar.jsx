import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useLanguage } from "../../context/LanguageContext";

import {
  LayoutDashboard,
  Pill,
  Building2,
  Stethoscope,
  Users,
  FileBarChart,
  Bot,
  Settings,
  Plus,
  ChevronDown,
  LogOut,
  FlaskConical,
  TrendingUp,
  Package,
  Bed,
  ShieldAlert,
  Siren,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t.dashboard,
      path: "/dashboard",
    },

    {
      icon: Package,
      label: t.stockPrediction,
      path: "/stock-prediction",
    },
    {
      icon: Bed,
      label: t.bedAvailability,
      path: "/bed-availability",
    },
    {
      icon: ShieldAlert,
      label: t.resourceAllocation,
      path: "/resource-allocation",
    },
    {
      icon: Siren,
      label: t.diseaseOutbreak,
      path: "/disease-outbreak",
    },
    {
      icon: Users,
      label: t.patients,
      path: "/patients",
    },
    {
      icon: Pill,
      label: t.medicines,
      path: "/medicines",
    },
    {
      icon: Stethoscope,
      label: t.doctors,
      path: "/doctors",
    },
    {
      icon: Building2,
      label: t.phcs,
      path: "/phcs",
    },
    {
      icon: FlaskConical,
      label: t.tests,
      path: "/tests",
    },
    {
      icon: FileBarChart,
      label: t.analytics,
      path: "/analytics",
    },
   {
  icon: Bot,
  label: t.aiInsights,
  path: "/assistant",
},
    {
      icon: Settings,
      label: t.settings,
      path: "/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-72 bg-[#083344] text-white flex flex-col justify-between min-h-screen">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="px-6 pt-6">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center">
              <Plus className="w-7 h-7" />
            </div>

            <div>
              <h1 className="font-bold text-xl">
                {t.appTitle}
              </h1>

              <p className="text-xs text-slate-300">
                {t.commandCenter}
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10 px-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition ${
                    isActive
                      ? "bg-teal-700 text-white"
                      : "hover:bg-slate-700 text-slate-200"
                  }`
                }
              >
                <Icon size={18} />

                <span className="text-sm font-medium">
                  {item.label}
                </span>

              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-5">

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-teal-600 flex items-center justify-center font-bold">
              DA
            </div>

            <div>

              <p className="font-semibold">
                {t.districtAdmin}
              </p>

              <p className="text-xs text-slate-300">
                {t.administrator}
              </p>

            </div>

          </div>

          <ChevronDown size={18} />

        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 border border-teal-500 text-teal-300 hover:bg-teal-600 hover:text-white transition-all duration-200 rounded-xl py-3 font-medium"
        >
          <LogOut size={18} />
          {t.logout}
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
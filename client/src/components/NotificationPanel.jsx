import { useEffect, useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  BedDouble,
  ClipboardList,
  UserCheck,
} from "lucide-react";

import { usePHC } from "../context/PHCContext";

import { getMedicines } from "../services/medicineService";
import { getPatients } from "../services/patientService";
import { getPHCs } from "../services/phcService";
import { getTests } from "../services/testService";

function NotificationPanel({ open }) {
  const { selectedPHC } = usePHC();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, [selectedPHC]);

  async function loadNotifications() {
    const [medicines, patients, phcs, tests] = await Promise.all([
      getMedicines(),
      getPatients(),
      getPHCs(),
      getTests(),
    ]);

    let list = [];

    // Critical Medicines
    medicines
      .filter((m) => m.status === "Critical")
      .forEach((m) => {
        list.push({
          title: "Critical Medicine",
          message: `${m.name} is critically low`,
          phcName: m.phcName,
          time: "Now",
          color: "text-red-600",
          icon: AlertTriangle,
        });
      });

    // Critical Patients
    const patientMap = {};

    patients.forEach((p) => {
      if (p.status !== "Critical") return;

      patientMap[p.phcName] =
        (patientMap[p.phcName] || 0) + 1;
    });

    Object.entries(patientMap).forEach(([phc, count]) => {
      list.push({
        title: "Critical Patients",
        message: `${count} critical patients`,
        phcName: phc,
        time: "Today",
        color: "text-red-600",
        icon: AlertTriangle,
      });
    });

    // Bed Occupancy
    phcs.forEach((phc) => {
      const occupancy =
        (phc.occupiedBeds / phc.totalBeds) * 100;

      if (occupancy >= 85) {
        list.push({
          title: "High Bed Occupancy",
          message: `${Math.round(
            occupancy
          )}% beds occupied`,
          phcName: phc.name,
          time: "Today",
          color: "text-amber-600",
          icon: BedDouble,
        });
      }
    });

    // Doctor Shortage
    phcs.forEach((phc) => {
      if (phc.doctorCount <= 1) {
        list.push({
          title: "Doctor Shortage",
          message: `Only ${phc.doctorCount} doctor available`,
          phcName: phc.name,
          time: "Today",
          color: "text-blue-600",
          icon: UserCheck,
        });
      }
    });

    // Diagnostic Upgrade
    tests.forEach((test) => {
      if (test.availableTests < 8) {
        list.push({
          title: "Diagnostics Upgrade",
          message: `${test.availableTests}/10 tests available`,
          phcName: test.phcName,
          time: test.lastAudit,
          color: "text-purple-600",
          icon: ClipboardList,
        });
      }
    });

    if (selectedPHC !== "All PHCs") {
      list = list.filter(
        (item) => item.phcName === selectedPHC
      );
    }

    setNotifications(list);
  }

  if (!open) return null;

  return (
    <div className="absolute right-0 top-14 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50">

      <div className="flex items-center gap-3 p-5 border-b">

        <Bell className="text-teal-700" />

        <div>
          <h2 className="font-bold text-lg">
            Notifications
          </h2>

          <p className="text-sm text-slate-500">
            {selectedPHC === "All PHCs"
              ? "Latest district updates"
              : `Latest updates for ${selectedPHC}`}
          </p>
        </div>

      </div>

      <div className="max-h-[400px] overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-8 text-center text-slate-500">
            No notifications
          </div>

        ) : (

          notifications.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex gap-4 p-4 hover:bg-slate-50 border-b"
              >

                <Icon
                  className={`${item.color} mt-1`}
                  size={20}
                />

                <div className="flex-1">

                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-1">
                    {item.message}
                  </p>

                  <div className="flex justify-between mt-2">

                    <span className="text-xs text-teal-600 font-medium">
                      {item.phcName}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.time}
                    </span>

                  </div>

                </div>

              </div>
            );
          })

        )}

      </div>

      <button className="w-full py-4 text-teal-700 font-semibold hover:bg-slate-50 rounded-b-2xl">
        View All Notifications →
      </button>

    </div>
  );
}

export default NotificationPanel;
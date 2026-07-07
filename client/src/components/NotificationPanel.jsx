import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Truck,
  BedDouble,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Critical Stock Alert",
    message: "Paracetamol will run out in 2 days",
    time: "2 min ago",
    color: "text-red-600",
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: "Bed Occupancy",
    message: "PHC Kothapalli reached 92%",
    time: "10 min ago",
    color: "text-amber-600",
    icon: BedDouble,
  },
  {
    id: 3,
    title: "Doctor Attendance",
    message: "All PHCs adequately staffed",
    time: "25 min ago",
    color: "text-green-600",
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Medicine Transfer",
    message: "80 units transferred successfully",
    time: "1 hour ago",
    color: "text-blue-600",
    icon: Truck,
  },
];

function NotificationPanel({ open }) {
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
            Latest district updates
          </p>
        </div>

      </div>

      <div className="max-h-[400px] overflow-y-auto">

        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 hover:bg-slate-50 cursor-pointer border-b"
            >

              <Icon className={`${item.color} mt-1`} size={20} />

              <div className="flex-1">

                <h3 className="font-semibold text-sm">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  {item.message}
                </p>

                <span className="text-xs text-slate-400">
                  {item.time}
                </span>

              </div>

            </div>
          );
        })}

      </div>

      <button className="w-full py-4 text-teal-700 font-semibold hover:bg-slate-50 rounded-b-2xl">
        View All Notifications →
      </button>

    </div>
  );
}

export default NotificationPanel;
import { useState, useEffect } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Activity,
  Globe,
} from "lucide-react";

import NotificationPanel from "../NotificationPanel";
import { useLanguage } from "../../context/LanguageContext";

function Header() {
  const { t, language } = useLanguage();

  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();

    if (hour < 12) return t.goodMorning;
    if (hour < 17) return t.goodAfternoon;

    return t.goodEvening;
  };

  const locale =
    language === "te"
      ? "te-IN"
      : language === "hi"
      ? "hi-IN"
      : "en-IN";

  const formattedDate = currentTime.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString(locale);

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">

      {/* Left */}

      <div>

        <p className="text-lg font-medium text-slate-600">
          {getGreeting()},
        </p>

        <h1 className="text-3xl font-bold text-slate-800 mt-1">
          {t.districtHealthCommandCenter}
        </h1>

        <div className="flex items-center gap-6 mt-4 text-sm">

          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Activity size={16} />
            <span>{t.systemOnline}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
          </div>

          <div className="font-semibold text-slate-700">
            {formattedTime}
          </div>

          <div className="flex items-center gap-2 text-teal-700">
            <Globe size={16} />
            <span>4 {t.phcsConnected}</span>
          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm bg-white">
          <option>{t.allPHCs}</option>
          <option>PHC Kothapalli</option>
          <option>PHC Nunna</option>
          <option>PHC Tadepalli</option>
        </select>

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative"
          >
            <Bell size={22} className="text-slate-700" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              4
            </span>

          </button>

          <NotificationPanel open={showNotifications} />

        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 shadow-sm">

          <p className="text-xs text-slate-500">
            {t.districtHealthScore}
          </p>

          <div className="flex items-center gap-2 mt-1">

            <span className="text-2xl font-bold text-teal-700">
              84
            </span>

            <span className="text-slate-500">
              /100
            </span>

            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              {t.stable}
            </span>

          </div>

        </div>

        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-11 h-11 rounded-full bg-teal-700 text-white flex items-center justify-center font-semibold">
            DA
          </div>

          <div>

            <p className="font-semibold text-slate-800">
              {t.districtAdmin}
            </p>

            <p className="text-xs text-slate-500">
              {t.administrator}
            </p>

          </div>

          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  );
}

export default Header;
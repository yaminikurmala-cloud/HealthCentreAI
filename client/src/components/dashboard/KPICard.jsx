import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  goodWhenUp = true,
}) {
  let TrendIcon = Minus;

  if (trendType === "up") TrendIcon = TrendingUp;
  if (trendType === "down") TrendIcon = TrendingDown;

  const positive =
    (goodWhenUp && trendType === "up") ||
    (!goodWhenUp && trendType === "down");

  const neutral = trendType === "same";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 cursor-pointer"
    >
      {/* Top */}

      <div className="flex justify-between items-center">

        <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center">

          <Icon size={22} />

        </div>

        

      </div>

      {/* Value */}

      <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-800">

        {value}

      </h2>

      {/* Title */}

      <p className="mt-2 text-slate-700">

        {title}

      </p>

      {/* Trend */}

      <div
        className={`mt-5 flex items-center gap-2 text-sm
        ${
          neutral
            ? "text-slate-400"
            : positive
            ? "text-green-600"
            : "text-red-500"
        }`}
      >

        <TrendIcon size={16} />

        <span>{trend}</span>

      </div>

    </motion.div>
  );
}

export default KPICard;
import { motion } from "framer-motion";

function KPICard({
  title,
  value,
  icon: Icon,
}) {
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
      {/* Icon */}

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

    </motion.div>
  );
}

export default KPICard;
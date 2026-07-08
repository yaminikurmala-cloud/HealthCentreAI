import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";
import { applyRecommendation } from "../../services/recommendationService";

function ApplyRecommendationButton({
  phcName,
  recommendation,
  onApplied,
}) {
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  async function handleApply() {
    if (loading || applied) return;

    setLoading(true);

    const result = await applyRecommendation(
      phcName,
      recommendation
    );

    setLoading(false);

    if (result.success) {
      setApplied(true);

      if (onApplied) {
        onApplied();
      }
    }
  }

  if (applied) {
    return (
      <button
        disabled
        className="mt-3 w-full flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg py-2 text-sm font-medium"
      >
        <Check size={16} />
        {t.recommendationApplied}
      </button>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="mt-3 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white rounded-lg py-2 text-sm font-medium transition flex items-center justify-center gap-2"
    >
      {loading && (
        <Loader2
          size={16}
          className="animate-spin"
        />
      )}

      {loading
        ? t.applyingRecommendation
        : t.applyRecommendation}
    </button>
  );
}

export default ApplyRecommendationButton;
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse">

      <div className="flex justify-between items-center">

        <div className="space-y-3">

          <div className="h-4 w-28 bg-slate-200 rounded"></div>

          <div className="h-8 w-20 bg-slate-300 rounded"></div>

          <div className="h-3 w-32 bg-slate-200 rounded"></div>

        </div>

        <div className="w-14 h-14 rounded-xl bg-slate-200"></div>

      </div>

    </div>
  );
}

export default SkeletonCard;
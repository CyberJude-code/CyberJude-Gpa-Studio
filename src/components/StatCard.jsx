function StatCard({ title, value, icon, trend, helper }) {
  return (
    <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass transition-fast hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/80 text-sky-300 shadow-lg shadow-sky-500/10">
          {icon}
        </div>
      </div>
      {trend && <p className="mt-4 text-sm text-slate-400">{trend}</p>}
      {helper && <p className="mt-3 text-sm text-slate-300">{helper}</p>}
    </div>
  );
}

export default StatCard;

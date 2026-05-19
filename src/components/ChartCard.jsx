function ChartCard({ title, description, children }) {
  return (
    <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass transition-fast hover:-translate-y-1">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{title}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{description}</h2>
        </div>
      </div>
      <div className="min-h-[240px]">{children}</div>
    </div>
  );
}

export default ChartCard;

function ProgressRing({ percentage, label }) {
  return (
    <div className="glass-card rounded-3xl border border-slate-700/70 p-5 text-center shadow-glass">
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-slate-900/80">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-950/90 text-center shadow-inner shadow-black/20">
          <div>
            <p className="text-3xl font-semibold text-white">{percentage}%</p>
            <p className="text-sm text-slate-400">{label}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 text-sm text-slate-400">Semester progress highlights your current workload and momentum.</div>
    </div>
  );
}

export default ProgressRing;

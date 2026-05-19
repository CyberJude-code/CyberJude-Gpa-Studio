function Badge({ label, className }) {
  return (
    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-slate-950/20 ${className}`}>
      {label}
    </span>
  );
}

export default Badge;

import { Trash2, Edit3 } from 'lucide-react';

function CourseRow({ course, onDelete, onChange }) {
  return (
    <div className="grid grid-cols-12 gap-3 rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4 text-sm text-slate-200 shadow-sm shadow-slate-950/10 transition hover:-translate-y-0.5">
      <input
        className="col-span-12 rounded-2xl border border-slate-700/50 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 lg:col-span-2"
        placeholder="Course Code"
        value={course.code}
        onChange={(event) => onChange(course.id, 'code', event.target.value)}
      />
      <input
        className="col-span-12 rounded-2xl border border-slate-700/50 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 lg:col-span-4"
        placeholder="Course Title"
        value={course.title}
        onChange={(event) => onChange(course.id, 'title', event.target.value)}
      />
      <input
        type="number"
        min="1"
        className="col-span-12 rounded-2xl border border-slate-700/50 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 lg:col-span-2"
        placeholder="Unit"
        value={course.unit}
        onChange={(event) => onChange(course.id, 'unit', event.target.value)}
      />
      <select
        className="col-span-12 rounded-2xl border border-slate-700/50 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 lg:col-span-2"
        value={course.grade}
        onChange={(event) => onChange(course.id, 'grade', event.target.value)}
      >
        <option value="">Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
      <button
        type="button"
        className="col-span-12 inline-flex h-14 items-center justify-center gap-2 rounded-3xl bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/20 lg:col-span-2"
        onClick={() => onDelete(course.id)}
        aria-label="Delete course"
      >
        <Trash2 className="h-4 w-4" /> Remove
      </button>
    </div>
  );
}

export default CourseRow;

import { Menu, Moon, Sun, Bell, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Topbar({ setOpen }) {
  const { theme, toggleTheme } = useTheme();
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="sticky top-0 z-20 border-b border-slate-700/60 bg-slate-950/80 backdrop-blur-xl dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-slate-100 transition hover:bg-slate-800 md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden rounded-3xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-400 md:flex md:items-center">
            <span className="mr-2 text-sky-300">CyberJude</span>
            <span>Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-slate-200 transition hover:bg-slate-800"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-slate-200 transition hover:bg-slate-800"
            onClick={() => setNotificationOpen((prev) => !prev)}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">1</span>
          </button>
          <Link
            className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-95 md:inline-flex"
            to="/calculator"
          >
            <Plus className="h-4 w-4" /> Add Course
          </Link>
        </div>
      </div>
      {notificationOpen && (
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <div className="mb-4 rounded-3xl border border-slate-700/60 bg-slate-900/90 p-4 text-sm text-slate-300 shadow-xl shadow-slate-950/20">
            <p className="font-semibold text-white">Study Tip</p>
            <p className="mt-1 text-slate-400">Review your latest trend chart to keep consistent progress and avoid grade dips.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Topbar;

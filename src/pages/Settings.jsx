import { useState } from 'react';
import { Moon, Sun, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { clearStorage } from '../utils/storage.js';

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useLocalStorage('academy-notifications', true);
  const [autoSave, setAutoSave] = useLocalStorage('academy-autosave', true);
  const [gradeSystem, setGradeSystem] = useLocalStorage('academy-grade-system', 'default');
  const [resetMessage, setResetMessage] = useState('');

  const handleReset = () => {
    clearStorage(['academy-courses', 'academy-history', 'academy-theme', 'academy-notifications', 'academy-autosave', 'academy-grade-system']);
    setResetMessage('All data cleared. Reload the page to start fresh.');
  };

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-3xl border border-slate-700/70 p-8 shadow-glass">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Settings</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Customize your GPA system</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Adjust theme, notification behavior, and reset options for your academic dashboard.</p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300 shadow-lg shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Status</p>
            <p className="mt-4 text-xl font-semibold text-white">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
            <p className="mt-2 text-sm text-slate-400">Switch themes for comfortable studying day or night.</p>
            <button
              type="button"
              onClick={toggleTheme}
              className="mt-6 inline-flex items-center gap-3 rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              Toggle {theme === 'dark' ? 'Light' : 'Dark'} mode
            </button>
          </div>

          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <h2 className="text-xl font-semibold text-white">Preferences</h2>
            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-950/80 px-5 py-4">
                <span>
                  <span className="block text-sm font-semibold text-white">Notifications</span>
                  <span className="text-sm text-slate-400">Receive daily academic reminders.</span>
                </span>
                <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="h-5 w-5 rounded-md text-sky-500" />
              </label>
              <label className="flex items-center justify-between rounded-3xl border border-slate-700/70 bg-slate-950/80 px-5 py-4">
                <span>
                  <span className="block text-sm font-semibold text-white">Auto-save</span>
                  <span className="text-sm text-slate-400">Keep your progress stored automatically.</span>
                </span>
                <input type="checkbox" checked={autoSave} onChange={() => setAutoSave(!autoSave)} className="h-5 w-5 rounded-md text-sky-500" />
              </label>
              <label className="flex flex-col gap-2 rounded-3xl border border-slate-700/70 bg-slate-950/80 p-5">
                <span className="text-sm font-semibold text-white">Grading system</span>
                <select
                  value={gradeSystem}
                  onChange={(e) => setGradeSystem(e.target.value)}
                  className="h-12 rounded-3xl border border-slate-700/60 bg-slate-900/90 px-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="default">Default (A-F)</option>
                  <option value="custom">Custom scale</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Reset data</h2>
                <p className="mt-2 text-sm text-slate-400">Clear your GPA progress and start fresh anytime.</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-3xl bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
            >
              <Trash2 className="h-4 w-4" /> Reset all data
            </button>
            {resetMessage && <p className="mt-4 text-sm text-emerald-300">{resetMessage}</p>}
          </div>
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <div className="flex items-start gap-4">
              <div className="rounded-3xl bg-sky-500/10 p-4 text-sky-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Profile enhancements</h2>
                <p className="mt-2 text-sm text-slate-400">Upgrade your dashboard with premium analytics, offline-ready saves, and achievement badges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

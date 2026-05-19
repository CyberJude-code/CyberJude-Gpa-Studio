import { NavLink } from 'react-router-dom';
import { Home, BookOpen, BarChart3, Settings, Layers } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/calculator', label: 'Calculator', icon: BookOpen },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function Sidebar({ open, setOpen }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-slate-950/95 glass-card border-r border-slate-700/60 shadow-glass transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex h-full flex-col justify-between px-6 py-8">
        <div>
          <div className="mb-10 flex items-center gap-3 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 text-2xl font-bold shadow-xl shadow-sky-500/20">
              C
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">CyberJude</p>
              <h1 className="text-xl font-semibold">GPA Studio</h1>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive ? 'bg-gradient-to-r from-sky-500/20 text-sky-200 shadow-lg shadow-sky-500/10' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-5 text-sm text-slate-300 shadow-xl shadow-slate-950/20">
          <p className="text-slate-400">Premium Academic AI mode</p>
          <p className="mt-2 font-semibold text-white">Focus, analyze, and improve your GPA.</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

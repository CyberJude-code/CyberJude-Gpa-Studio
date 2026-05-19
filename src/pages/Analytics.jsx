import { useMemo } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js';
import ChartCard from '../components/ChartCard.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { starterCourses, starterHistory } from '../data/dummy.js';
import { calculateGPA, countGrades, calculateCGPA } from '../utils/gpa.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

function Analytics() {
  const [courses] = useLocalStorage('academy-courses', starterCourses);
  const [history] = useLocalStorage('academy-history', starterHistory);
  const { gpa } = calculateGPA(courses);
  const cgpa = calculateCGPA(history);
  const grades = countGrades(courses);

  const gradeDistribution = useMemo(
    () => ({
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      datasets: [
        {
          data: [grades.A || 0, grades.B || 0, grades.C || 0, grades.D || 0, grades.E || 0, grades.F || 0],
          backgroundColor: ['#34d399', '#3b82f6', '#a78bfa', '#f59e0b', '#22c55e', '#ef4444'],
        },
      ],
    }),
    [grades]
  );

  const trendData = useMemo(
    () => ({
      labels: history.map((item) => item.semester),
      datasets: [
        {
          label: 'GPA',
          data: history.map((item) => item.gpa),
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56,189,248,0.16)',
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [history]
  );

  const unitsData = useMemo(
    () => ({
      labels: history.map((item) => item.semester),
      datasets: [
        {
          label: 'Units Completed',
          data: history.map((item) => item.units),
          backgroundColor: '#818cf8',
        },
      ],
    }),
    [history]
  );

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-3xl border border-slate-700/70 p-8 shadow-glass">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Analytics Studio</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Academic growth and performance</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Explore grade distribution, GPA progression, and semester comparison in a modern academic dashboard.</p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300 shadow-lg shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Snapshot</p>
            <p className="mt-4 text-3xl font-semibold text-white">{gpa.toFixed(2)}</p>
            <p className="text-sm text-slate-400">Latest semester GPA</p>
            <p className="mt-4 text-sm text-slate-500">CGPA: {cgpa.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-6">
          <ChartCard title="Performance" description="GPA trend by semester">
            <Line data={trendData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { mode: 'index' } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { suggestedMin: 0, suggestedMax: 5, ticks: { color: '#94a3b8' } } } }} />
          </ChartCard>

          <ChartCard title="Semester comparison" description="Units per semester">
            <Bar data={unitsData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.parsed.y} units` } } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { beginAtZero: true, ticks: { color: '#94a3b8' } } } }} />
          </ChartCard>
        </div>
        <div className="space-y-6">
          <ChartCard title="Grade distribution" description="Current term grades">
            <div className="h-[320px]">
              <Pie data={gradeDistribution} options={{ responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#cbd5e1' } } } }} />
            </div>
          </ChartCard>
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Insights</p>
            <div className="mt-5 space-y-4 text-slate-300">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Steady growth</p>
                <p className="mt-2 text-sm text-slate-400">Your GPA has risen in most semesters, showing strong upward momentum.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Balanced load</p>
                <p className="mt-2 text-sm text-slate-400">Unit distribution remains balanced, which helps maintain consistent performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;

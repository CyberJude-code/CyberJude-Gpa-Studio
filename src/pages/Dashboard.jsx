import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { Home, Sparkles, ArrowUpRight, PieChart, Activity, TrendingUp, BookOpen } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import StatCard from '../components/StatCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import ChartCard from '../components/ChartCard.jsx';
import Badge from '../components/Badge.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { starterCourses, starterHistory, dailyQuotes, badgeMilestones } from '../data/dummy.js';
import { calculateCGPA, calculateGPA, countGrades, getAcademicInsight } from '../utils/gpa.js';
import { classifyGPA } from '../utils/grades.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler);

function Dashboard() {
  const [courses] = useLocalStorage('academy-courses', starterCourses);
  const [history] = useLocalStorage('academy-history', starterHistory);

  const { gpa, totalUnits } = calculateGPA(courses);
  const cgpa = calculateCGPA(history);
  const classification = classifyGPA(gpa);
  const grades = countGrades(courses);
  const quote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
  const totalCourses = courses.length;
  const completedSemesters = history.length;

  const trendData = useMemo(
    () => ({
      labels: history.map((item) => item.semester),
      datasets: [
        {
          label: 'Semester GPA',
          data: history.map((item) => item.gpa),
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56,189,248,0.18)',
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    [history]
  );

  const distributionData = useMemo(
    () => ({
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      datasets: [
        {
          data: [grades.A || 0, grades.B || 0, grades.C || 0, grades.D || 0, grades.E || 0, grades.F || 0],
          backgroundColor: ['#34d399', '#3b82f6', '#a78bfa', '#f59e0b', '#22c55e', '#ef4444'],
          borderWidth: 0,
        },
      ],
    }),
    [grades]
  );

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="glass-card rounded-3xl border border-slate-700/70 p-8 shadow-glass">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Welcome back</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Your academic command center</h1>
              <p className="mt-3 max-w-2xl text-slate-400">Track GPA, manage courses, review analytics, and shape your future performance with premium insights.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-auto">
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-95"
              >
                Calculate GPA
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-700/70 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Add Course
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Current GPA" value={gpa.toFixed(2)} icon={<Home className="h-5 w-5" />} trend="Your current course load performance." />
            <StatCard title="CGPA" value={cgpa.toFixed(2)} icon={<TrendingUp className="h-5 w-5" />} trend={`${completedSemesters} semesters tracked`} />
            <StatCard title="Courses" value={totalCourses} icon={<BookOpen className="h-5 w-5" />} helper="Active courses this semester." />
            <StatCard title="Units" value={totalUnits} icon={<Activity className="h-5 w-5" />} helper="Total credit load for the term." />
          </div>
        </div>

        <div className="grid gap-5">
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Motivation</p>
                <h2 className="mt-3 text-xl font-semibold text-white">Today’s academic pulse</h2>
              </div>
              <Sparkles className="h-6 w-6 text-amber-300" />
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-200">{quote}</p>
          </div>

          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Classification</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{classification.title}</h2>
              </div>
              <Badge label={classification.title} className={classification.badge} />
            </div>
            <div className="mt-6 grid gap-4">
              <p className="text-slate-400">{getAcademicInsight(gpa)}</p>
              <div className="rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-300">
                <p className="font-medium text-white">Achievement streak</p>
                <p className="mt-2">You have improved GPA in {completedSemesters - 1} consecutive semesters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <ChartCard title="Trend" description="GPA performance trend">
            <Line data={trendData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { suggestedMin: 0, suggestedMax: 5, ticks: { color: '#94a3b8' } } } }} />
          </ChartCard>
          <ChartCard title="Overview" description="Academic strengths & insights">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300 shadow-inner shadow-black/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Focus area</p>
                <p className="mt-3 text-2xl font-semibold text-white">Research Writing</p>
                <p className="mt-2 text-sm">Strong performance with A grades and steady mentorship progress.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300 shadow-inner shadow-black/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Weekly score</p>
                <p className="mt-3 text-2xl font-semibold text-white">92%</p>
                <p className="mt-2 text-sm">Your recent study sessions show consistent improvement.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-slate-300 shadow-inner shadow-black/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Weakness</p>
                <p className="mt-3 text-2xl font-semibold text-white">Physics Theory</p>
                <p className="mt-2 text-sm">Aim for two strong revision sessions to boost this subject.</p>
              </div>
            </div>
          </ChartCard>
        </div>
        <div className="space-y-6">
          <ProgressRing percentage={Math.min(100, Math.round((gpa / 5) * 100))} label="Semester GPA" />
          <ChartCard title="Grade distribution" description="Current course breakdown">
            <div className="h-[260px]">
              <Bar data={{ labels: distributionData.labels, datasets: distributionData.datasets }} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => `${context.parsed.y} courses` } } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { beginAtZero: true, ticks: { color: '#94a3b8' } } } }} />
            </div>
          </ChartCard>
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Achievement badges</p>
            <div className="mt-6 space-y-4">
              {badgeMilestones.map((badge) => (
                <div key={badge.title} className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4 shadow-sm shadow-slate-950/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{badge.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{badge.detail}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-sky-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Plus, RotateCcw, Download, Printer, Search, Filter, Sparkles, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import CourseRow from '../components/CourseRow.jsx';
import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { starterCourses } from '../data/dummy.js';
import { calculateCGPA, calculateGPA, countGrades, exportAsPdf, generateReportText, getAcademicInsight, inferGenderFromMatric, neededGPAForGoal, sortCourses } from '../utils/gpa.js';
import { classifyGPA } from '../utils/grades.js';

function Calculator() {
  const [courses, setCourses] = useLocalStorage('academy-courses', starterCourses);
  const [history] = useLocalStorage('academy-history', []);
  const [search, setSearch] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [sortField, setSortField] = useState('grade');
  const [sortDir, setSortDir] = useState('desc');
  const [goalCGPA, setGoalCGPA] = useState(5.0);
  const [nextUnits, setNextUnits] = useState(18);
  const [studentName, setStudentName] = useLocalStorage('academy-student-name', 'Student');
  const [matricNumber, setMatricNumber] = useLocalStorage('academy-matric-number', '');
  const [started, setStarted] = useState(false);
  const [savedReport, setSavedReport] = useLocalStorage('academy-report-text', '');

  const { gpa, totalUnits, totalPoints } = calculateGPA(courses);
  const classification = classifyGPA(gpa);
  const gradeCounts = countGrades(courses);
  const cgpa = calculateCGPA(history);
  const gender = inferGenderFromMatric(matricNumber);
  const insight = getAcademicInsight(gpa);

  useEffect(() => {
    if (gpa >= 4.5) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }, [gpa]);

  const filteredCourses = useMemo(() => {
    let list = courses;
    if (search) {
      const normalized = search.toLowerCase();
      list = list.filter((course) => course.code.toLowerCase().includes(normalized) || course.title.toLowerCase().includes(normalized));
    }
    if (filterGrade) {
      list = list.filter((course) => course.grade === filterGrade);
    }
    return sortCourses(list, sortField, sortDir);
  }, [courses, search, filterGrade, sortField, sortDir]);

  const requiredGPA = neededGPAForGoal(cgpa, history.reduce((sum, item) => sum + item.units, 0), goalCGPA, nextUnits);

  const reportSummary = useMemo(
    () =>
      generateReportText({
        name: studentName || 'Student',
        matricNumber: matricNumber || 'N/A',
        gender,
        gpa,
        classification: classification.title,
        totalUnits,
        totalPoints,
        cgpa,
        courseCount: filteredCourses.length,
        gradeCounts,
        goalCGPA,
        nextUnits,
        requiredGPA,
        insight,
      }),
    [studentName, matricNumber, gender, gpa, classification, totalUnits, totalPoints, cgpa, filteredCourses.length, gradeCounts, goalCGPA, nextUnits, requiredGPA, insight]
  );

  const updateCourse = (id, field, value) => {
    setCourses((prev) => prev.map((course) => (course.id === id ? { ...course, [field]: field === 'unit' ? Number(value) : value } : course)));
  };

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: `c${Date.now()}`, code: '', title: '', unit: 3, grade: 'A' },
    ]);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const resetCourses = () => {
    setCourses([]);
  };

  const downloadReport = () => {
    exportAsPdf(reportSummary, 'gpa-report.pdf');
  };

  const saveReport = () => {
    setSavedReport(reportSummary);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-3xl border border-slate-700/70 p-8 shadow-glass">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">GPA Calculator</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Build your semester profile</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Add courses, review predicted GPA, export reports, and manage your semester performance in one polished experience.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student name"
              className="h-12 rounded-3xl border border-slate-700/60 bg-slate-950/90 px-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            />
            <input
              type="text"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="Matric number"
              className="h-12 rounded-3xl border border-slate-700/60 bg-slate-950/90 px-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/20 transition hover:bg-slate-800"
              onClick={addCourse}
            >
              <Plus className="h-4 w-4" /> Add Course
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-95"
              onClick={() => setStarted(true)}
            >
              <Play className="h-4 w-4" /> Start GPA
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-emerald-400 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:opacity-95"
              onClick={downloadReport}
            >
              <Download className="h-4 w-4" /> Download Report
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-4">
          <StatCard title="Semester GPA" value={gpa.toFixed(2)} icon={<ArrowRight className="h-5 w-5" />} helper={`Based on ${totalUnits} units`} />
          <StatCard title="CGPA" value={cgpa.toFixed(2)} icon={<Sparkles className="h-5 w-5" />} helper="Cumulative academic average" />
          <StatCard title="Classification" value={classification.title} icon={<Filter className="h-5 w-5" />} helper={insight} />
          <StatCard title="Course Load" value={filteredCourses.length} icon={<Search className="h-5 w-5" />} helper="Visible rows after filters" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-6">
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Course List</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Manage your subjects</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses"
                    className="h-12 w-full rounded-3xl border border-slate-700/60 bg-slate-950/90 px-12 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="h-12 rounded-3xl border border-slate-700/60 bg-slate-950/90 px-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">All Grades</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center rounded-3xl bg-slate-900/90 px-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                  onClick={() => setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                >
                  Sort: {sortDir === 'desc' ? 'High → Low' : 'Low → High'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <CourseRow key={course.id} course={course} onDelete={deleteCourse} onChange={updateCourse} />
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/90 p-5 shadow-inner shadow-black/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Smart feedback</p>
                <p className="mt-4 text-lg font-semibold text-white">{insight}</p>
                <p className="mt-3 text-sm text-slate-400">Your current score and classification are checked every time your course list updates.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 shadow-inner shadow-black/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Prediction</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm text-slate-300">Target CGPA (max 5.0)</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.01"
                      value={goalCGPA}
                      onChange={(e) => setGoalCGPA(Math.min(5, Number(e.target.value)))}
                      className="mt-2 h-12 w-full rounded-3xl border border-slate-700/60 bg-slate-950/90 px-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300">Next semester units</label>
                    <input
                      type="number"
                      min="0"
                      value={nextUnits}
                      onChange={(e) => setNextUnits(Number(e.target.value))}
                      className="mt-2 h-12 w-full rounded-3xl border border-slate-700/60 bg-slate-950/90 px-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-4 text-center text-slate-100">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Required GPA</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{requiredGPA > 0 ? requiredGPA.toFixed(2) : 'N/A'}</p>
                    <p className="mt-2 text-sm text-slate-500">Needed next semester to reach your target</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Classification badge</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <Badge label={classification.title} className={classification.badge} />
              <span className="text-sm text-slate-400">{classification.min.toFixed(2)} - {classification.max.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-slate-400">Achieve higher thresholds by focusing on stronger grades and unit load balance.</p>
          </div>
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Text report</p>
            <div className="mt-5 rounded-3xl bg-slate-950/80 p-5 text-sm leading-6 text-slate-300 shadow-inner shadow-black/20">
              <pre className="whitespace-pre-wrap">{started ? reportSummary : 'Press START to calculate your GPA and generate a written academic report.'}</pre>
            </div>
            <button
              type="button"
              onClick={saveReport}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              <Printer className="h-4 w-4" /> Save Report Summary
            </button>
            {savedReport && (
              <p className="mt-3 text-sm text-emerald-300">Report saved for later review.</p>
            )}
          </div>
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Grade overview</p>
            <div className="mt-5 space-y-3">
              {['A', 'B', 'C', 'D', 'E', 'F'].map((grade) => (
                <div key={grade} className="flex items-center justify-between rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                  <span>{grade}</span>
                  <span className="font-semibold text-white">{gradeCounts[grade] || 0}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-3xl border border-slate-700/70 p-6 shadow-glass">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Actions</p>
            <button
              type="button"
              onClick={printReport}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              <Printer className="h-4 w-4" /> Print Report
            </button>
            <button
              type="button"
              onClick={resetCourses}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
            >
              <RotateCcw className="h-4 w-4" /> Reset Courses
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Calculator;

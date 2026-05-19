export const gradeOptions = [
  { label: 'A', value: 'A', points: 5 },
  { label: 'B', value: 'B', points: 4 },
  { label: 'C', value: 'C', points: 3 },
  { label: 'D', value: 'D', points: 2 },
  { label: 'E', value: 'E', points: 1 },
  { label: 'F', value: 'F', points: 0 },
];

export const gradePoints = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const classificationRules = [
  { title: 'First Class', min: 4.5, max: 5, color: 'from-amber-500 via-orange-400 to-rose-500', badge: 'bg-gradient-to-r from-amber-500 to-orange-400' },
  { title: 'Second Class Upper', min: 3.5, max: 4.49, color: 'from-sky-500 to-blue-500', badge: 'bg-gradient-to-r from-sky-500 to-blue-600' },
  { title: 'Second Class Lower', min: 2.4, max: 3.49, color: 'from-violet-500 to-fuchsia-500', badge: 'bg-gradient-to-r from-violet-500 to-fuchsia-600' },
  { title: 'Third Class', min: 1.5, max: 2.39, color: 'from-orange-400 to-amber-500', badge: 'bg-gradient-to-r from-orange-400 to-amber-500' },
  { title: 'Pass', min: 1, max: 1.49, color: 'from-emerald-400 to-lime-500', badge: 'bg-gradient-to-r from-emerald-400 to-lime-500' },
  { title: 'Fail', min: 0, max: 0.99, color: 'from-red-500 to-rose-500', badge: 'bg-gradient-to-r from-red-500 to-rose-500' },
];

export function classifyGPA(gpa) {
  if (Number.isNaN(gpa)) return classificationRules[classificationRules.length - 1];
  return classificationRules.find((rule) => gpa >= rule.min && gpa <= rule.max) || classificationRules[classificationRules.length - 1];
}

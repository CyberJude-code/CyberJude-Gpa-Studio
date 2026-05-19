import { gradePoints, classificationRules } from './grades.js';

export function calculateGPA(courses) {
  const activeCourses = courses.filter((course) => course.unit && course.grade);
  const totalUnits = activeCourses.reduce((sum, course) => sum + Number(course.unit || 0), 0);
  const totalPoints = activeCourses.reduce((sum, course) => sum + Number(course.unit || 0) * (gradePoints[course.grade] ?? 0), 0);
  const gpa = totalUnits ? totalPoints / totalUnits : 0;
  return { gpa: Number(gpa.toFixed(2)), totalUnits, totalPoints };
}

export function countGrades(courses) {
  return courses.reduce((acc, course) => {
    const grade = course.grade || 'F';
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});
}
export function inferGenderFromMatric(matricNumber = '') {
  const normalized = matricNumber.trim();
  if (!normalized) return 'Unknown';
  const parts = normalized.split('/').map((part) => part.trim());
  const genderSegment = parts.find((part) => part === '1' || part === '2');
  if (genderSegment === '1') return 'Male';
  if (genderSegment === '2') return 'Female';
  return 'Unknown';
}

export function calculateCGPA(history) {
  if (!history.length) return 0;
  const totalPoints = history.reduce((sum, semester) => sum + semester.gpa * semester.units, 0);
  const totalUnits = history.reduce((sum, semester) => sum + semester.units, 0);
  const cgpa = totalUnits ? totalPoints / totalUnits : 0;
  return Number(cgpa.toFixed(2));
}

export function getAcademicInsight(gpa) {
  if (gpa >= 4.5) return 'Excellent performance! You are maintaining First Class standing.';
  if (gpa >= 4.35) return `You are only ${(4.5 - gpa).toFixed(2)} points away from First Class.`;
  if (gpa >= 3.5) return 'Strong progress this semester. Keep up the momentum to reach the top tier.';
  if (gpa >= 2.4) return 'Nice work. With a bit more focus, you can move into the upper class range.';
  if (gpa >= 1.5) return 'Steady effort. Target stronger grades next semester to lift your CGPA.';
  return 'You need stronger performance next semester to improve your academic standing.';
}

export function neededGPAForGoal(currentCGPA, completedUnits, targetCGPA, nextUnits) {
  const requiredPoints = targetCGPA * (completedUnits + nextUnits) - currentCGPA * completedUnits;
  return nextUnits ? Number((requiredPoints / nextUnits).toFixed(2)) : 0;
}

export function sortCourses(courses, criteria, direction) {
  return [...courses].sort((a, b) => {
    if (criteria === 'grade') {
      return direction === 'asc' ? a.grade.localeCompare(b.grade) : b.grade.localeCompare(a.grade);
    }
    if (criteria === 'unit') {
      return direction === 'asc' ? a.unit - b.unit : b.unit - a.unit;
    }
    return 0;
  });
}

export function generateReportText({ name = 'Student', matricNumber = 'N/A', gender = 'Unknown', gpa, classification, totalUnits, totalPoints, cgpa, courseCount, gradeCounts, goalCGPA, nextUnits, requiredGPA, insight }) {
  const lines = [
    'Academic Performance Report',
    '---------------------------',
    `Student Name: ${name}`,
    `Matric Number: ${matricNumber}`,
    `Gender: ${gender}`,
    `Report Date: ${new Date().toLocaleString()}`,
    '',
    `Semester GPA: ${gpa.toFixed(2)}`,
    `CGPA: ${cgpa.toFixed(2)} (5.0 scale)`,
    `Academic Classification: ${classification}`,
    `Total credit units: ${totalUnits}`,
    `Courses counted: ${courseCount}`,
    `Grade points earned: ${totalPoints}`,
    '',
    `Grade distribution: ${gradeCounts.A || 0} A's, ${gradeCounts.B || 0} B's, ${gradeCounts.C || 0} C's, ${gradeCounts.D || 0} D's, ${gradeCounts.E || 0} E's, ${gradeCounts.F || 0} F's.`,
    '',
    `Feedback: ${insight}`,
    `Goal target: To reach a CGPA of ${goalCGPA.toFixed(2)} with ${nextUnits} units next semester, you need an average GPA of ${requiredGPA > 0 ? requiredGPA.toFixed(2) : 'N/A'}.`,
    '',
    'Recommendation: Keep your study plan consistent, review your highest-impact courses, and use this report to track progress over time.',
  ];
  return lines.join('\n');
}

function csvSafe(value) {
  const text = value == null ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export function generateReportCsv({ name = 'Student', matricNumber = 'N/A', gpa, classification, totalUnits, totalPoints, cgpa, courseCount, gradeCounts, goalCGPA, nextUnits, requiredGPA, insight, courses = [] }) {
  const gender = inferGenderFromMatric(matricNumber);
  const reportDate = new Date().toLocaleString();
  const rows = [
    ['Field', 'Value'],
    ['Student Name', name],
    ['Matric Number', matricNumber],
    ['Gender', gender],
    ['Report Date', reportDate],
    ['Semester GPA', gpa.toFixed(2)],
    ['CGPA (5.0 scale)', cgpa.toFixed(2)],
    ['Academic Classification', classification],
    ['Total Credit Units', totalUnits],
    ['Courses Counted', courseCount],
    ['Grade Points Earned', totalPoints],
    ['Goal CGPA', goalCGPA.toFixed(2)],
    ['Next Semester Units', nextUnits],
    ['Required GPA', requiredGPA > 0 ? requiredGPA.toFixed(2) : 'N/A'],
    ['Feedback', insight],
    [],
    ['Course Code', 'Course Title', 'Unit', 'Grade'],
    ...courses.map((course) => [course.code || '', course.title || '', course.unit || 0, course.grade || 'F']),
    [],
    ['Grade Distribution', `A:${gradeCounts.A || 0}; B:${gradeCounts.B || 0}; C:${gradeCounts.C || 0}; D:${gradeCounts.D || 0}; E:${gradeCounts.E || 0}; F:${gradeCounts.F || 0}`],
  ];
  return rows.map((row) => row.map(csvSafe).join(',')).join('\r\n');
}

export function exportAsCsv(text, filename) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportAsPdf(text, filename) {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(text, maxWidth);
    let cursorY = margin;
    for (const line of lines) {
      if (cursorY > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += 14;
    }
    doc.save(filename);
  } catch (err) {
    // Fallback to text download if PDF lib not available
    exportAsText(text, filename.replace(/\.pdf$/, '.txt'));
  }
}

export function exportAsText(text, filename) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

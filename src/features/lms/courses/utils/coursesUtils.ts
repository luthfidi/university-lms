// Helper functions for courses
export const getProgressColor = (progress: number) => {
  if (progress >= 90) return "green";
  if (progress >= 75) return "blue";
  if (progress >= 50) return "yellow";
  return "orange";
};

// Mock data for courses
export const courses = [
  {
    id: "cs101",
    code: "CS101",
    name: "Introduction to Computer Science",
    lecturer: "Dr. Jane Smith",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    progress: 65,
  },
  {
    id: "math201",
    code: "MATH201",
    name: "Calculus I",
    lecturer: "Prof. Robert Johnson",
    type: "LEC",
    credits: 4,
    semester: "Odd 2024/2025",
    progress: 45,
  },
  {
    id: "eng102",
    code: "ENG102",
    name: "English Composition",
    lecturer: "Dr. Emily Williams",
    type: "LEC",
    credits: 2,
    semester: "Odd 2024/2025",
    progress: 80,
  },
  {
    id: "cs101l",
    code: "CS101L",
    name: "Introduction to Computer Science Lab",
    lecturer: "Michael Chen",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    progress: 70,
  },
  {
    id: "phys101",
    code: "PHYS101",
    name: "Physics I",
    lecturer: "Dr. Alan Parker",
    type: "LEC",
    credits: 3,
    semester: "Odd 2024/2025",
    progress: 55,
  },
  {
    id: "phys101l",
    code: "PHYS101L",
    name: "Physics I Lab",
    lecturer: "Sarah Johnson",
    type: "LAB",
    credits: 1,
    semester: "Odd 2024/2025",
    progress: 60,
  },
];

// Semester options for filter
export const semesterOptions = [
  { value: "odd-2024", label: "Odd Semester 2024/2025" },
  { value: "even-2023", label: "Even Semester 2023/2024" },
  { value: "odd-2023", label: "Odd Semester 2023/2024" },
];

// Course type options for filter
export const courseTypeOptions = [
  { value: "", label: "All Types" },
  { value: "lec", label: "Lecture (LEC)" },
  { value: "lab", label: "Laboratory (LAB)" },
];

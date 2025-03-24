// ======= HELPER FUNCTIONS =======

/**
 * Format date for display
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (date >= yesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
};

/**
 * Format full date and time
 */
export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get days until a due date
 */
export const getDueStatus = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffDays = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return { label: "Overdue", color: "red" };
  if (diffDays === 0) return { label: "Due Today", color: "orange" };
  if (diffDays === 1) return { label: "Due Tomorrow", color: "yellow" };
  return { label: `Due in ${diffDays} days`, color: "green" };
};

/**
 * Get color based on progress percentage
 */
export const getProgressColor = (progress: number) => {
  if (progress >= 90) return "green";
  if (progress >= 75) return "blue";
  if (progress >= 50) return "yellow";
  return "orange";
};

// ======= MOCK DATA =======

// Data for upcoming classes
export const upcomingClasses = [
  {
    id: "cls-001",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    startTime: "09:00",
    endTime: "10:40",
    room: "Room 301",
    deliveryMode: "F2F",
    lecturer: "Dr. Jane Smith",
  },
  {
    id: "cls-002",
    courseName: "Calculus I",
    courseCode: "MATH201",
    startTime: "13:00",
    endTime: "14:40",
    room: "Zoom Meeting",
    deliveryMode: "VC",
    lecturer: "Prof. Robert Johnson",
  },
];

// Data for assignments
export const assignments = [
  {
    id: "asg-001",
    title: "Programming Assignment #3",
    courseCode: "CS101",
    dueDate: "2025-03-10T23:59:00",
    status: "pending",
    type: "assignment",
  },
  {
    id: "quiz-cs101-2",
    title: "Quiz 2: Control Structures",
    courseCode: "CS101",
    dueDate: "2025-03-12T10:00:00",
    status: "pending",
    type: "quiz",
  },
  {
    id: "midterm-math201",
    title: "Midterm Exam",
    courseCode: "MATH201",
    dueDate: "2025-03-15T09:00:00",
    status: "upcoming",
    type: "exam",
  },
];

// Data for announcements
export const announcements = [
  {
    id: "ann-001",
    title: "Exam Schedule Posted",
    content:
      "The final exam schedule has been posted. Please check the calendar.",
    date: "2025-03-05T10:30:00",
    author: "Academic Office",
  },
  {
    id: "ann-002",
    title: "Library Hours Extended",
    content: "The library will be open extended hours during finals week.",
    date: "2025-03-04T14:15:00",
    author: "Library Services",
  },
];

// Data for course progress
export const courseProgress = [
  {
    id: "crs-001",
    name: "Introduction to Computer Science",
    code: "CS101",
    progress: 65,
    tasks: { completed: 13, total: 20 },
  },
  {
    id: "crs-002",
    name: "Calculus I",
    code: "MATH201",
    progress: 45,
    tasks: { completed: 9, total: 20 },
  },
  {
    id: "crs-003",
    name: "English Composition",
    code: "ENG102",
    progress: 80,
    tasks: { completed: 16, total: 20 },
  },
];

// Forum posts data
export const forumPosts = [
  {
    id: "post-1",
    title: "Question about Assignment #3",
    author: "John Doe",
    course: "CS101",
    postedAt: "2025-03-05T14:30:00",
  },
  {
    id: "post-2",
    title: "Study Group for Midterm",
    author: "Jane Smith",
    course: "MATH201",
    postedAt: "2025-03-05T09:15:00",
  },
];

// Todo list data
export const todoItems = [
  {
    id: "todo-1",
    text: "Complete Programming Assignment",
    completed: false,
  },
  {
    id: "todo-2",
    text: "Study for Math Quiz",
    completed: false,
  },
  {
    id: "todo-3",
    text: "Read Chapter 5",
    completed: true,
  },
];

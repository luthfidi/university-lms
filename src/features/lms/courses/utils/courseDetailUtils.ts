// Helper functions for course detail

/**
 * Format date for display
 */
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

/**
 * Format time for display
 */
export const formatTime = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleTimeString("en-US", options);
};

/**
 * Get material icon based on type
 */
export const getMaterialTypeInfo = (type: string) => {
  switch (type) {
    case "pdf":
      return { icon: "MdPictureAsPdf", label: "PDF Document" };
    case "slides":
      return { icon: "MdSlideshow", label: "Presentation Slides" };
    case "video":
      return { icon: "MdVideoLibrary", label: "Video Recording" };
    default:
      return { icon: "MdDescription", label: "Document" };
  }
};

// Mock data for a specific course
export const courseData = {
  id: "cs101",
  code: "CS101",
  name: "Introduction to Computer Science",
  description:
    "A foundational course covering basic computer science concepts including algorithms, data structures, and problem-solving techniques.",
  lecturer: "Dr. Jane Smith",
  type: "LEC",
  credits: 3,
  semester: "Odd 2024/2025",
  progress: 65,
  sessions: [
    {
      id: "ses-1",
      number: 1,
      title: "Introduction to Computing Concepts",
      subTopic: "History of computing, basic terminology",
      startDate: "2025-02-03T09:00:00",
      endDate: "2025-02-03T10:40:00",
      deliveryMode: "F2F",
      learningOutcome: "Understand basic computing concepts and terminology",
      status: "completed",
      materials: [
        {
          id: "mat-1-1",
          title: "Introduction to CS Slides",
          type: "slides",
          path: "/materials/cs101-intro-slides.pdf",
        },
        {
          id: "mat-1-2",
          title: "Computing History Reading",
          type: "pdf",
          path: "/materials/computing-history.pdf",
        },
      ],
    },
    {
      id: "ses-2",
      number: 2,
      title: "Problem Solving Strategies",
      subTopic: "Algorithmic thinking, pseudocode",
      startDate: "2025-02-10T09:00:00",
      endDate: "2025-02-10T10:40:00",
      deliveryMode: "F2F",
      learningOutcome:
        "Develop problem-solving strategies and express solutions in pseudocode",
      status: "completed",
      materials: [
        {
          id: "mat-2-1",
          title: "Problem Solving Slides",
          type: "slides",
          path: "/materials/problem-solving.pdf",
        },
        {
          id: "mat-2-2",
          title: "Problem Set 1",
          type: "pdf",
          path: "/materials/problem-set-1.pdf",
        },
      ],
    },
    {
      id: "ses-3",
      number: 3,
      title: "Introduction to Python",
      subTopic: "Basic syntax, variables, data types",
      startDate: "2025-02-17T09:00:00",
      endDate: "2025-02-17T10:40:00",
      deliveryMode: "VC",
      learningOutcome:
        "Write simple Python programs using basic syntax and data types",
      status: "completed",
      materials: [
        {
          id: "mat-3-1",
          title: "Python Basics Slides",
          type: "slides",
          path: "/materials/python-basics.pdf",
        },
        {
          id: "mat-3-2",
          title: "Python Installation Guide",
          type: "pdf",
          path: "/materials/python-setup.pdf",
        },
        {
          id: "mat-3-3",
          title: "Lecture Recording",
          type: "video",
          path: "/materials/python-lecture.mp4",
        },
      ],
    },
    {
      id: "ses-4",
      number: 4,
      title: "Control Structures",
      subTopic: "Conditional statements, loops",
      startDate: "2025-02-24T09:00:00",
      endDate: "2025-02-24T10:40:00",
      deliveryMode: "F2F",
      learningOutcome: "Implement conditional logic and iteration in programs",
      status: "in-progress",
      materials: [
        {
          id: "mat-4-1",
          title: "Control Structures Slides",
          type: "slides",
          path: "/materials/control-structures.pdf",
        },
        {
          id: "mat-4-2",
          title: "Problem Set 2",
          type: "pdf",
          path: "/materials/problem-set-2.pdf",
        },
      ],
    },
    {
      id: "ses-5",
      number: 5,
      title: "Functions and Modules",
      subTopic: "Function definition, parameters, return values",
      startDate: "2025-03-03T09:00:00",
      endDate: "2025-03-03T10:40:00",
      deliveryMode: "F2F",
      learningOutcome: "Create modular programs using functions and modules",
      status: "upcoming",
      materials: [
        {
          id: "mat-5-1",
          title: "Functions and Modules Slides",
          type: "slides",
          path: "/materials/functions-modules.pdf",
        },
      ],
    },
    {
      id: "ses-6",
      number: 6,
      title: "Data Structures: Lists and Tuples",
      subTopic: "Sequence types, operations, methods",
      startDate: "2025-03-10T09:00:00",
      endDate: "2025-03-10T10:40:00",
      deliveryMode: "VC",
      learningOutcome:
        "Work with lists and tuples to manage collections of data",
      status: "upcoming",
      materials: [],
    },
  ],
  assignments: [
    {
      id: "asg-1",
      title: "Problem Set 1: Algorithms and Pseudocode",
      description:
        "Practice creating algorithms and writing pseudocode for basic problems.",
      dueDate: "2025-02-17T23:59:00",
      status: "completed",
      score: 85,
    },
    {
      id: "asg-2",
      title: "Programming Assignment 1: Python Basics",
      description:
        "Implement simple programs using Python variables, expressions, and basic I/O.",
      dueDate: "2025-02-24T23:59:00",
      status: "completed",
      score: 90,
    },
    {
      id: "asg-3",
      title: "Programming Assignment 2: Control Structures",
      description: "Build programs that utilize conditional logic and loops.",
      dueDate: "2025-03-10T23:59:00",
      status: "in-progress",
    },
  ],
  syllabus: {
    description:
      "This course introduces fundamental concepts of computer science including problem-solving, algorithms, programming basics, and data structures. Students will gain practical programming experience using Python.",
    topics: [
      "Introduction to Computing and Algorithmic Thinking",
      "Problem Solving Strategies",
      "Programming Fundamentals",
      "Control Structures",
      "Functions and Modular Programming",
      "Data Structures",
      "File I/O",
      "Object-Oriented Programming Basics",
      "Algorithm Analysis",
      "Recursion",
    ],
    textbooks: [
      {
        title: "Introduction to Computer Science using Python",
        author: "John Smith",
        publisher: "Academic Press",
        year: "2022",
        required: true,
      },
      {
        title: "Algorithms and Problem Solving",
        author: "Emily Johnson",
        publisher: "University Press",
        year: "2020",
        required: false,
      },
    ],
  },
  forums: [
    {
      id: "forum-1",
      title: "General Discussion",
      description: "General questions and discussions about the course",
      threads: 12,
      lastPost: "2025-03-05T14:30:00",
    },
    {
      id: "forum-2",
      title: "Assignment #1 Discussion",
      description: "Questions and clarifications for Assignment #1",
      threads: 8,
      lastPost: "2025-02-16T09:15:00",
    },
    {
      id: "forum-3",
      title: "Assignment #2 Discussion",
      description: "Questions and clarifications for Assignment #2",
      threads: 15,
      lastPost: "2025-02-23T16:45:00",
    },
  ],
  participants: {
    lecturers: 1,
    assistants: 2,
    students: 32,
  },
  attendance: {
    present: 4,
    absent: 0,
    total: 13,
  },
};

// Tab items for course detail
export const tabItems = [
  { id: "sessions", label: "Sessions" },
  { id: "syllabus", label: "Syllabus" },
  { id: "forum", label: "Forum" },
  { id: "assessments", label: "Assessments" },
  { id: "gradebook", label: "Gradebook" },
  { id: "people", label: "People" },
  { id: "attendance", label: "Attendance" },
];

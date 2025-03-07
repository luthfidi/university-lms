// User related types
export type UserRole = "student" | "lecturer" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  isActive: boolean;
}

// Module types
export type AppModule = "lms" | "university";

// Academic related types
export type ClassType = "LEC" | "LAB";
export type DeliveryMode = "F2F" | "VC";
export type SemesterType = "odd" | "even";

export interface AcademicPeriod {
  id: string;
  year: string;
  semester: SemesterType;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

// Course related types
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  program: string;
  isActive: boolean;
}

export interface Class {
  id: string;
  courseId: string;
  course: Course;
  academicPeriodId: string;
  academicPeriod: AcademicPeriod;
  classCode: string;
  classType: ClassType;
  capacity: number;
  deliveryMode: DeliveryMode;
  description?: string;
  lecturers: ClassLecturer[];
}

export interface ClassLecturer {
  id: string;
  classId: string;
  lecturerId: string;
  lecturer: User;
  isPrimary: boolean;
}

export interface Session {
  id: string;
  classId: string;
  sessionNumber: number;
  subTopic: string;
  learningOutcome: string;
  startDate: string;
  endDate: string;
  deliveryMode: DeliveryMode;
  materials: LearningMaterial[];
}

export interface LearningMaterial {
  id: string;
  sessionId: string;
  title: string;
  filePath: string;
  type: string;
  uploadDate: string;
  lecturerId: string;
}

// Forum related types
export interface ForumTopic {
  id: string;
  classId: string;
  title: string;
  startDate: string;
  endDate: string;
  isAssignment: boolean;
  createdBy: string;
  threads: ForumThread[];
}

export interface ForumThread {
  id: string;
  forumTopicId: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  user: User;
  discussions: ForumDiscussion[];
}

export interface ForumDiscussion {
  id: string;
  forumThreadId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  user: User;
  isPrivate: boolean;
}

// Assessment related types
export type AssessmentType =
  | "quiz"
  | "assignment"
  | "midterm"
  | "final"
  | "project";
export type QuestionType = "multiple_choice" | "file_upload" | "essay";

export interface Assessment {
  id: string;
  classId: string;
  name: string;
  type: AssessmentType;
  startDate: string;
  endDate: string;
  totalQuestions: number;
  totalAttempts: number;
  scoringMethod: string;
  timeLimit: number;
  isPublished: boolean;
  createdBy: string;
  questions: Question[];
}

export interface Question {
  id: string;
  assessmentId: string;
  questionNumber: number;
  questionText: string;
  questionType: QuestionType;
  points: number;
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  questionId: string;
  optionText: string;
  isCorrect: boolean;
}

export interface StudentAssessmentAttempt {
  id: string;
  studentId: string;
  assessmentId: string;
  attemptNumber: number;
  startTime: string;
  endTime?: string;
  score?: number;
  answers: StudentQuestionAnswer[];
}

export interface StudentQuestionAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  answerText?: string;
  filePath?: string;
  score?: number;
  feedback?: string;
}

// Attendance related types
export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  status: AttendanceStatus;
  timestamp: string;
  method: string;
}

// Gradebook related types
export interface GradeComponent {
  id: string;
  classId: string;
  componentName: string;
  componentType: string;
  weight: number;
}

export interface StudentGrade {
  id: string;
  studentId: string;
  gradeComponentId: string;
  rawScore: number;
  weightedScore: number;
  letterGrade?: string;
  feedback?: string;
  gradedAt: string;
  gradedBy: string;
}

export interface FinalGrade {
  id: string;
  studentId: string;
  classId: string;
  totalScore: number;
  letterGrade: string;
  remarks?: string;
  updatedAt: string;
}

// KRS related types
export interface StudentCourseRegistration {
  id: string;
  studentId: string;
  classId: string;
  academicPeriodId: string;
  registrationDate: string;
  status: "pending" | "approved" | "rejected";
}

// Financial related types
export interface TuitionFee {
  id: string;
  programId: string;
  academicPeriodId: string;
  amount: number;
  feeType: string;
  description?: string;
}

export interface StudentFee {
  id: string;
  studentId: string;
  academicPeriodId: string;
  totalAmount: number;
  dueDate: string;
  status: "unpaid" | "partially_paid" | "paid" | "overdue";
}

export interface PaymentRecord {
  id: string;
  studentFeeId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  referenceNumber: string;
  receiptPath?: string;
  status: "pending" | "completed" | "failed";
}

// UI related types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  module: AppModule;
  roles: UserRole[];
  children?: NavItem[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

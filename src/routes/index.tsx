import { Navigate, Outlet, RouteObject } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import StudentLMSDashboard from "@/features/lms/dashboard/pages/StudentDashboard";
import LecturerLMSDashboard from "@/features/lms/dashboard/pages/LecturerDashboard";
import AdminLMSDashboard from "@/features/lms/dashboard/pages/AdminDashboard";
import StudentUniversityDashboard from "@/features/university/dashboard/pages/StudentDashboard";
import LecturerUniversityDashboard from "@/features/university/dashboard/pages/LecturerDashboard";
import AdminUniversityDashboard from "@/features/university/dashboard/pages/AdminDashboard";
import NotFoundPage from "@/features/common/pages/NotFoundPage";
import { UserRole } from "@/types/global";
import CoursesPage from "@/features/lms/courses/pages/CoursesPage";
import CourseDetailPage from "@/features/lms/courses/pages/CourseDetailPage";
import ForumListPage from "@/features/lms/forum/pages/ForumListPage";
import ForumDetailPage from "@/features/lms/forum/pages/ForumDetailPage";
import CreateThreadPage from "@/features/lms/forum/pages/CreateThreadPage";
import AssessmentListPage from "@/features/lms/assessment/pages/AssessmentListPage";
import AssessmentDetailPage from "@/features/lms/assessment/pages/AssessmentDetailPage";
import AssessmentResultPage from "@/features/lms/assessment/pages/AssessmentResultPage";
import AttendanceListPage from "@/features/lms/attendance/pages/AttendanceListPage";
import GradebookPage from "@/features/lms/gradebook/pages/GradebookPage";
import SchedulePage from "@/features/lms/schedule/pages/SchedulePage";
import AnnouncementPage from "@/features/lms/announcement/pages/AnnouncementPage";
import KRSPage from "@/features/university/krs/pages/KRSPage";
import AcademicHistoryPage from "@/features/university/academic/pages/AcademicHistoryPage";
import ProfileDocumentsPage from "@/features/university/profile/pages/ProfileDocumentsPage";

// Helper to handle role-based dashboard redirection
const DashboardRouter = ({
  module,
  role,
}: {
  module: string;
  role: UserRole;
}) => {
  switch (module) {
    case "lms":
      switch (role) {
        case "student":
          return <StudentLMSDashboard />;
        case "lecturer":
          return <LecturerLMSDashboard />;
        case "admin":
          return <AdminLMSDashboard />;
        default:
          return <Navigate to="/login" />;
      }
    case "university":
      switch (role) {
        case "student":
          return <StudentUniversityDashboard />;
        case "lecturer":
          return <LecturerUniversityDashboard />;
        case "admin":
          return <AdminUniversityDashboard />;
        default:
          return <Navigate to="/login" />;
      }
    default:
      return <Navigate to="/login" />;
  }
};

// Routes that require authentication
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      // LMS Module Routes
      {
        path: "lms",
        children: [
          {
            index: true,
            element: <Navigate to="/lms/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <DashboardRouter module="lms" role="student" />,
          },
          {
            path: "courses",
            children: [
              {
                index: true,
                element: <CoursesPage />,
              },
              {
                path: ":courseId",
                element: <CourseDetailPage />,
              },
            ],
          },
          {
            path: "forum",
            children: [
              {
                index: true,
                element: <ForumListPage />,
              },
              {
                path: ":topicId",
                element: <ForumDetailPage />,
              },
              {
                path: ":topicId/create",
                element: <CreateThreadPage />,
              },
            ],
          },
          {
            path: "assessment",
            children: [
              {
                index: true,
                element: <AssessmentListPage />,
              },
              {
                path: ":assessmentId",
                element: <AssessmentDetailPage />,
              },
              {
                path: ":assessmentId/result",
                element: <AssessmentResultPage />,
              },
            ],
          },
          {
            path: "attendance",
            element: <AttendanceListPage />,
          },
          {
            path: "gradebook",
            element: <GradebookPage />,
          },
          {
            path: "schedule",
            element: <SchedulePage />,
          },
          {
            path: "announcement",
            element: <AnnouncementPage />,
          },
          // Add more LMS routes here
        ],
      },
      // University Module Routes
      {
        path: "university",
        children: [
          {
            index: true,
            element: <Navigate to="/university/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <DashboardRouter module="university" role="student" />,
          },
          {
            path: "krs",
            element: <KRSPage />,
          },
          {
            path: "academic-history",
            element: <AcademicHistoryPage />,
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: (
                  <Navigate to="/university/profile/documents" replace />
                ),
              },
              {
                path: "documents",
                element: <ProfileDocumentsPage />,
              },
              // Future profile-related pages can be added here
            ],
          },
          // Add more University routes here
        ],
      },
    ],
  },
];

// Public routes (no authentication required)
const publicRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
];

// Redirect root to login
const rootRoute: RouteObject = {
  path: "/",
  element: <Navigate to="/login" replace />,
};

// 404 route
const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFoundPage />,
};

const routes: RouteObject[] = [
  rootRoute,
  ...publicRoutes,
  ...protectedRoutes,
  notFoundRoute,
];

export default routes;

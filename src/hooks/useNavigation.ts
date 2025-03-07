import { useMemo } from "react";
import { NavItem } from "@/types/global";
import useAuthStore from "@/store/authStore";

// Navigation configuration
const navigationConfig: NavItem[] = [
  // LMS Module - Student Role
  {
    id: "lms-dashboard",
    label: "Dashboard",
    icon: "dashboard",
    path: "/lms/dashboard",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-courses",
    label: "Courses",
    icon: "book",
    path: "/lms/courses",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-forum",
    label: "Forum",
    icon: "forum",
    path: "/lms/forum",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-assessment",
    label: "Assessment",
    icon: "assignment",
    path: "/lms/assessment",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-gradebook",
    label: "Gradebook",
    icon: "grade",
    path: "/lms/gradebook",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-attendance",
    label: "Attendance",
    icon: "event_available",
    path: "/lms/attendance",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-schedule",
    label: "Schedule",
    icon: "calendar_month",
    path: "/lms/schedule",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "lms-announcement",
    label: "Announcement",
    icon: "notifications",
    path: "/lms/announcement",
    module: "lms",
    roles: ["student", "lecturer", "admin"],
  },

  // LMS Module - Lecturer Specific
  {
    id: "lms-course-management",
    label: "Course Management",
    icon: "edit",
    path: "/lms/course-management",
    module: "lms",
    roles: ["lecturer", "admin"],
  },
  {
    id: "lms-grading",
    label: "Grading",
    icon: "grading",
    path: "/lms/grading",
    module: "lms",
    roles: ["lecturer", "admin"],
  },

  // LMS Module - Admin Specific
  {
    id: "lms-user-management",
    label: "User Management",
    icon: "manage_accounts",
    path: "/lms/user-management",
    module: "lms",
    roles: ["admin"],
  },
  {
    id: "lms-system-settings",
    label: "System Settings",
    icon: "settings",
    path: "/lms/system-settings",
    module: "lms",
    roles: ["admin"],
  },

  // University Module - Student Role
  {
    id: "university-dashboard",
    label: "Dashboard",
    icon: "dashboard",
    path: "/university/dashboard",
    module: "university",
    roles: ["student", "lecturer", "admin"],
  },
  {
    id: "university-krs",
    label: "KRS Management",
    icon: "description",
    path: "/university/krs",
    module: "university",
    roles: ["student"],
  },
  {
    id: "university-academic-history",
    label: "Academic History",
    icon: "history",
    path: "/university/academic-history",
    module: "university",
    roles: ["student"],
  },
  {
    id: "university-financial",
    label: "Financial",
    icon: "payments",
    path: "/university/financial",
    module: "university",
    roles: ["student"],
  },
  {
    id: "university-scholarship",
    label: "Scholarship",
    icon: "school",
    path: "/university/scholarship",
    module: "university",
    roles: ["student"],
  },
  {
    id: "university-profile",
    label: "Profile & Documents",
    icon: "account_box",
    path: "/university/profile",
    module: "university",
    roles: ["student", "lecturer"],
  },

  // University Module - Lecturer Specific
  {
    id: "university-payroll",
    label: "Payroll",
    icon: "payments",
    path: "/university/payroll",
    module: "university",
    roles: ["lecturer"],
  },
  {
    id: "university-teaching-load",
    label: "Teaching Load",
    icon: "work",
    path: "/university/teaching-load",
    module: "university",
    roles: ["lecturer"],
  },

  // University Module - Admin Specific
  {
    id: "university-academic-management",
    label: "Academic Management",
    icon: "school",
    path: "/university/academic-management",
    module: "university",
    roles: ["admin"],
  },
  {
    id: "university-financial-management",
    label: "Financial Management",
    icon: "account_balance",
    path: "/university/financial-management",
    module: "university",
    roles: ["admin"],
  },
  {
    id: "university-reports",
    label: "Reports",
    icon: "analytics",
    path: "/university/reports",
    module: "university",
    roles: ["admin"],
  },
];

const useNavigation = () => {
  const { user, activeModule } = useAuthStore();

  const navigation = useMemo(() => {
    if (!user) return [];

    return navigationConfig.filter(
      (item) => item.module === activeModule && item.roles.includes(user.role)
    );
  }, [user, activeModule]);

  return navigation;
};

export default useNavigation;

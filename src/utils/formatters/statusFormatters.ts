// src/utils/formatters/statusFormatters.ts

export type StatusType =
  // General statuses
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "expired"
  | "draft"
  // Payment statuses
  | "paid"
  | "unpaid"
  | "partially_paid"
  | "overdue"
  | "refunded"
  // Approval statuses
  | "approved"
  | "rejected"
  | "waiting"
  | "under_review"
  | "revision_needed"
  // Submission statuses
  | "submitted"
  | "not_submitted"
  | "late"
  | "graded"
  | "in_progress";

/**
 * Get appropriate badge color based on status
 */
export function getStatusColorScheme(status: StatusType | string): string {
  switch (status) {
    // Success states
    case "active":
    case "completed":
    case "approved":
    case "paid":
    case "graded":
    case "submitted":
      return "green";

    // Warning states
    case "pending":
    case "in_progress":
    case "under_review":
    case "draft":
    case "partially_paid":
    case "waiting":
      return "yellow";

    // Danger states
    case "inactive":
    case "rejected":
    case "unpaid":
    case "overdue":
    case "expired":
    case "late":
    case "not_submitted":
      return "red";

    // Info states
    case "revision_needed":
    case "refunded":
      return "blue";

    // Default
    default:
      return "gray";
  }
}

/**
 * Get formatted status label (capitalize and replace underscores)
 */
export function getStatusLabel(status: StatusType | string): string {
  if (!status) return "";

  // Replace underscores with spaces and capitalize each word
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get attendance status label and color
 */
export function getAttendanceStatusInfo(status: string): {
  label: string;
  color: string;
} {
  switch (status) {
    case "present":
      return { label: "Present", color: "green" };
    case "absent":
      return { label: "Absent", color: "red" };
    case "late":
      return { label: "Late", color: "yellow" };
    case "excused":
      return { label: "Excused", color: "blue" };
    default:
      return { label: status, color: "gray" };
  }
}

/**
 * Get grade color based on score
 */
export function getGradeColor(grade: string | number): string {
  // If it's a letter grade
  if (typeof grade === "string") {
    if (grade.startsWith("A")) return "green";
    if (grade.startsWith("B")) return "blue";
    if (grade.startsWith("C")) return "yellow";
    if (grade.startsWith("D")) return "orange";
    if (grade.startsWith("F")) return "red";
    return "gray";
  }

  // If it's a number (percentage)
  if (typeof grade === "number") {
    if (grade >= 90) return "green";
    if (grade >= 80) return "blue";
    if (grade >= 70) return "yellow";
    if (grade >= 60) return "orange";
    return "red";
  }

  return "gray";
}

/**
 * Get progress color based on percentage
 */
export function getProgressColor(
  percentage: number,
  minimumRequired: number = 80
): string {
  if (percentage >= minimumRequired) return "green";
  if (percentage >= minimumRequired - 10) return "yellow";
  return "red";
}

/**
 * Get method display
 */
export function getMethodDisplay(method: string): string {
  switch (method) {
    case "bank_transfer":
      return "Bank Transfer";
    case "virtual_account":
      return "Virtual Account";
    case "credit_card":
      return "Credit Card";
    default:
      return (
        method.charAt(0).toUpperCase() + method.slice(1).replace(/_/g, " ")
      );
  }
}

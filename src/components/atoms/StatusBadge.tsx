import { Badge, BadgeProps } from "@chakra-ui/react";

type StatusType =
  | "completed"
  | "in-progress"
  | "pending"
  | "upcoming"
  | "active"
  | "inactive"
  | "overdue"
  | "submitted"
  | "graded"
  | "present"
  | "absent"
  | "late"
  | "excused"
  | "warning"
  | "success"
  | "error"
  | "info";

interface StatusBadgeProps extends Omit<BadgeProps, "colorScheme"> {
  status: StatusType | string;
  text?: string; // Optional custom text, otherwise uses capitalized status
}

/**
 * StatusBadge component for displaying status with appropriate colors
 * Used across the application for consistent status representation
 */
const StatusBadge = ({ status, text, ...props }: StatusBadgeProps) => {
  // Map status to color scheme
  const getColorScheme = (status: string) => {
    const statusMap: Record<string, string> = {
      // Completion status
      completed: "green",
      "in-progress": "blue",
      pending: "yellow",
      upcoming: "gray",
      overdue: "red",
      // Activity status
      active: "green",
      inactive: "gray",
      // Submission status
      submitted: "blue",
      graded: "purple",
      // Attendance status
      present: "green",
      absent: "red",
      late: "yellow",
      excused: "gray",
      // Generic status
      warning: "orange",
      success: "green",
      error: "red",
      info: "blue",
    };

    return statusMap[status.toLowerCase()] || "gray";
  };

  // Format the status text - capitalize first letter of each word
  const formatStatusText = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayText = text || formatStatusText(status);
  const colorScheme = getColorScheme(status);

  return (
    <Badge colorScheme={colorScheme} {...props}>
      {displayText}
    </Badge>
  );
};

export default StatusBadge;

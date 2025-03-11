// src/utils/formatters/dateFormatters.ts

/**
 * Format date as "Mar 11, 2025"
 */
export function formatDate(dateString: string | Date): string {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format date as "Mon, Mar 11, 2025"
 */
export function formatDateWithDay(dateString: string | Date): string {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format date as "02:30 PM"
 */
export function formatTime(dateString: string | Date): string {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format date as "Mar 11, 2025, 02:30 PM"
 */
export function formatDateTime(dateString: string | Date): string {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get relative time like "Today", "Yesterday", "2 days ago", etc.
 */
export function getRelativeTime(dateString: string | Date): string {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();

  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
  } else {
    return formatDate(date);
  }
}

/**
 * Get time remaining until a deadline
 */
export function getTimeRemaining(dateString: string | Date): string {
  if (!dateString) return "";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();

  if (now > date) return "Expired";

  const diffTime = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (diffHours === 0) {
      const diffMinutes = Math.floor(
        (diffTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} remaining`;
    }
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} remaining`;
  } else if (diffDays === 1) {
    return "Due tomorrow";
  } else {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} remaining`;
  }
}

/**
 * Calculate days until due date
 */
export function getDaysUntilDue(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `${diffDays} days remaining`;
}

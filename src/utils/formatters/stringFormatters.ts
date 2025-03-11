// src/utils/formatters/stringFormatters.ts

/**
 * Truncate text with ellipsis if it exceeds max length
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Convert camelCase to Title Case (e.g., "firstName" to "First Name")
 */
export function camelToTitleCase(text: string): string {
  if (!text) return "";

  // Add space before capital letters and capitalize the first letter
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Convert snake_case to Title Case (e.g., "first_name" to "First Name")
 */
export function snakeToTitleCase(text: string): string {
  if (!text) return "";

  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generate initials from name (e.g., "John Doe" to "JD")
 */
export function getInitials(name: string): string {
  if (!name) return "";

  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

// src/hooks/useThemeColors.ts
import { useColorModeValue } from "@chakra-ui/react";
import { colors } from "@/theme/colors";

export function useThemeColors() {
  // Common UI elements
  const background = useColorModeValue(
    colors.ui.background.light,
    colors.ui.background.dark
  );
  const cardBg = useColorModeValue(colors.ui.card.light, colors.ui.card.dark);
  const borderColor = useColorModeValue(
    colors.ui.border.light,
    colors.ui.border.dark
  );
  const textColor = useColorModeValue(
    colors.ui.text.primary.light,
    colors.ui.text.primary.dark
  );
  const secondaryText = useColorModeValue(
    colors.ui.text.secondary.light,
    colors.ui.text.secondary.dark
  );
  const hoverBg = useColorModeValue(
    colors.ui.hover.light,
    colors.ui.hover.dark
  );
  const sectionBg = useColorModeValue(
    colors.ui.section.light,
    colors.ui.section.dark
  );

  // Status colors
  const successColor = useColorModeValue(
    colors.status.success.light,
    colors.status.success.dark
  );
  const warningColor = useColorModeValue(
    colors.status.warning.light,
    colors.status.warning.dark
  );
  const errorColor = useColorModeValue(
    colors.status.error.light,
    colors.status.error.dark
  );
  const infoColor = useColorModeValue(
    colors.status.info.light,
    colors.status.info.dark
  );

  return {
    background,
    cardBg,
    borderColor,
    textColor,
    secondaryText,
    hoverBg,
    sectionBg,
    successColor,
    warningColor,
    errorColor,
    infoColor,

    // Helper method for dynamic status colors
    getStatusColor: (status: string) => {
      switch (status) {
        case "success":
        case "completed":
        case "active":
        case "approved":
        case "paid":
          return successColor;
        case "warning":
        case "pending":
        case "partially_paid":
          return warningColor;
        case "error":
        case "failed":
        case "rejected":
        case "overdue":
        case "unpaid":
          return errorColor;
        default:
          return infoColor;
      }
    },

    // Helper for status badge color schemes
    getStatusColorScheme: (status: string): string => {
      switch (status) {
        // Success states
        case "active":
        case "completed":
        case "approved":
        case "paid":
        case "graded":
        case "submitted":
        case "success":
          return "green";

        // Warning states
        case "pending":
        case "in_progress":
        case "under_review":
        case "draft":
        case "partially_paid":
        case "waiting":
        case "warning":
          return "yellow";

        // Danger states
        case "inactive":
        case "rejected":
        case "unpaid":
        case "overdue":
        case "expired":
        case "late":
        case "not_submitted":
        case "error":
          return "red";

        // Info states
        case "revision_needed":
        case "refunded":
        case "info":
          return "blue";

        // Default
        default:
          return "gray";
      }
    },
  };
}

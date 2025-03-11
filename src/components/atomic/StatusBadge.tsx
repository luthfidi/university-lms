// src/components/atomic/StatusBadge.tsx
import { Badge, BadgeProps } from "@chakra-ui/react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getStatusLabel } from "@/utils/formatters/statusFormatters";

interface StatusBadgeProps extends Omit<BadgeProps, "colorScheme"> {
  status: string;
  label?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  ...restProps
}) => {
  const { getStatusColorScheme } = useThemeColors();

  // Generate a appropriate label if not provided
  const displayLabel = label || getStatusLabel(status);

  const colorScheme = getStatusColorScheme(status);

  return (
    <Badge colorScheme={colorScheme} {...restProps}>
      {displayLabel}
    </Badge>
  );
};

export default StatusBadge;

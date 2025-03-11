// src/components/atomic/feedback/EmptyState.tsx
import { Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useThemeColors } from "@/hooks/useThemeColors";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: IconType;
  action?: {
    label: string;
    onClick: () => void;
  };
  py?: number | string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon,
  action,
  py = 10,
}) => {
  const { secondaryText } = useThemeColors();

  return (
    <Box textAlign="center" py={py} gridColumn="1 / -1">
      {icon && <Icon as={icon} boxSize={16} color="gray.400" mb={4} />}
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color={secondaryText} mb={action ? 4 : 0}>
        {message}
      </Text>
      {action && (
        <Button mt={4} colorScheme="blue" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;

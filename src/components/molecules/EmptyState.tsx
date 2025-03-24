import { ReactNode } from "react";
import { Box, Button, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdOutlineSearchOff } from "react-icons/md";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: IconType;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

/**
 * EmptyState component for showing empty list/table states
 * Used when no data is available to display
 */
const EmptyState = ({
  title = "No Data Found",
  description = "There are no items to display.",
  icon = MdOutlineSearchOff,
  action,
  children,
}: EmptyStateProps) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Icon as={icon} boxSize={12} color="gray.400" mb={4} />

      <Heading as="h2" size="md" mb={2}>
        {title}
      </Heading>

      <Text color="gray.500" mb={children || action ? 6 : 0}>
        {description}
      </Text>

      {children}

      {action && (
        <VStack mt={children ? 4 : 0}>
          <Button colorScheme="blue" onClick={action.onClick}>
            {action.label}
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default EmptyState;

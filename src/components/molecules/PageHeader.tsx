import { Box, Heading, Text } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

/**
 * PageHeader component for consistent page headers across the application
 * Displays a title and optional description
 */
const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Box mb={6}>
      <Heading size="lg" mb={description ? 2 : 0}>
        {title}
      </Heading>
      {description && <Text color="gray.500">{description}</Text>}
    </Box>
  );
};

export default PageHeader;

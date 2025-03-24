import { ReactNode } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

interface ContentCardProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  noPadding?: boolean;
}

/**
 * ContentCard component for consistent card styling across the application
 * Wraps content in a card with standardized styling
 */
const ContentCard = ({
  title,
  children,
  action,
  noPadding = false,
}: ContentCardProps) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Card
      bg={cardBg}
      boxShadow="sm"
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      mb={6}
      overflow="hidden"
    >
      {title && (
        <CardHeader
          pb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md">{title}</Heading>
          {action && <Box>{action}</Box>}
        </CardHeader>
      )}
      <CardBody p={noPadding ? 0 : undefined}>{children}</CardBody>
    </Card>
  );
};

export default ContentCard;

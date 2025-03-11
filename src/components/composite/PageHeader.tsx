// src/components/composite/PageHeader.tsx
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  mb?: number | string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  mb = 6,
}) => {
  const { secondaryText } = useThemeColors();

  return (
    <Flex
      justify="space-between"
      align="flex-start"
      mb={mb}
      direction={{ base: "column", md: actions ? "row" : "column" }}
      gap={{ base: 2, md: 0 }}
    >
      <Box>
        <Heading size="lg" mb={subtitle ? 2 : 0}>
          {title}
        </Heading>
        {subtitle && <Text color={secondaryText}>{subtitle}</Text>}
      </Box>
      {actions && <Box mt={{ base: 2, md: 0 }}>{actions}</Box>}
    </Flex>
  );
};

export default PageHeader;

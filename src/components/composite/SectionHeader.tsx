// src/components/composite/SectionHeader.tsx
import { Flex, Heading, HeadingProps, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SectionHeaderProps extends HeadingProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  mb?: number | string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  action,
  mb = 4,
  ...rest
}) => {
  return (
    <Flex justify="space-between" align="center" mb={mb}>
      <Flex align="center">
        {icon && <Box mr={2}>{icon}</Box>}
        <Heading size="md" {...rest}>
          {title}
        </Heading>
      </Flex>
      {action && <Box>{action}</Box>}
    </Flex>
  );
};

export default SectionHeader;

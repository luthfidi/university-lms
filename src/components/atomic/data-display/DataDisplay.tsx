// src/components/atomic/data-display/DataDisplay.tsx
import { Box, Text, Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface DataItemProps extends FlexProps {
  label: string;
  value: ReactNode;
  labelWidth?: string | number;
}

export const DataItem: React.FC<DataItemProps> = ({
  label,
  value,
  labelWidth = "180px",
  ...rest
}) => {
  return (
    <Flex mb={2} {...rest}>
      <Text fontWeight="medium" width={labelWidth} flexShrink={0}>
        {label}:
      </Text>
      <Box flex="1">{value}</Box>
    </Flex>
  );
};

interface DataGroupProps {
  title?: string;
  children: ReactNode;
  mb?: number | string;
}

export const DataGroup: React.FC<DataGroupProps> = ({
  title,
  children,
  mb = 6,
}) => {
  return (
    <Box mb={mb}>
      {title && (
        <Text fontWeight="bold" mb={3} fontSize="md">
          {title}
        </Text>
      )}
      <Box pl={2}>{children}</Box>
    </Box>
  );
};

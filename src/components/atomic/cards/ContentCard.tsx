// src/components/atomic/cards/ContentCard.tsx
import { ReactNode } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardProps,
} from "@chakra-ui/react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface ContentCardProps extends Omit<CardProps, "title"> {
  title?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
  isFullHeight?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  footer,
  children,
  noPadding = false,
  isFullHeight = false,
  mb = 6,
  ...rest
}) => {
  const { cardBg, borderColor } = useThemeColors();

  return (
    <Card
      bg={cardBg}
      boxShadow="sm"
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      mb={mb}
      height={isFullHeight ? "100%" : "auto"}
      overflow="hidden"
      {...rest}
    >
      {title && <CardHeader pb={2}>{title}</CardHeader>}
      <CardBody p={noPadding ? 0 : 4}>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default ContentCard;

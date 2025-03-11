// src/components/composite/CourseCard.tsx
import {
  Box,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ContentCard from "@/components/atomic/cards/ContentCard";

interface CourseCardProps {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  type: string;
  credits: number;
  progress?: number;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  code,
  name,
  lecturer,
  type,
  credits,
  progress,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/lms/courses/${id}`);
    }
  };

  return (
    <ContentCard
      onClick={handleClick}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
      p={0}
    >
      <Box
        h="8px"
        bg={type === "LEC" ? "brand.primary.500" : "brand.secondary.500"}
        borderTopRadius="lg"
      />

      <Box p={5}>
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between" align="flex-start">
            <HStack spacing={2}>
              <Text fontWeight="bold" fontSize="lg" color="brand.primary.700">
                {code}
              </Text>
              <Badge colorScheme={type === "LEC" ? "blue" : "teal"}>
                {type}
              </Badge>
            </HStack>
            <Text fontWeight="medium">{credits} Credits</Text>
          </Flex>

          <Text fontWeight="bold" fontSize="md" noOfLines={2}>
            {name}
          </Text>

          <Text fontSize="sm" color="gray.500">
            Lecturer: {lecturer}
          </Text>

          {progress !== undefined && (
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">
                Progress: {progress}%
              </Text>

              <Button
                size="sm"
                variant="ghost"
                colorScheme="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/lms/courses/${id}`);
                }}
              >
                View Details
              </Button>
            </HStack>
          )}

          {progress !== undefined && (
            <Progress
              value={progress}
              size="sm"
              colorScheme={
                progress > 75 ? "green" : progress > 50 ? "blue" : "orange"
              }
              borderRadius="full"
            />
          )}
        </VStack>
      </Box>
    </ContentCard>
  );
};

export default CourseCard;

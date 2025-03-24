import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
  Badge,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";

interface CourseCardProps {
  course: {
    id: string;
    code: string;
    name: string;
    lecturer?: string;
    type: string;
    credits: number;
    semester?: string;
    progress?: number;
  };
  onViewDetails?: (courseId: string) => void;
}

/**
 * CourseCard component for displaying course information
 * Used in course listing and dashboard pages
 */
const CourseCard = ({ course, onViewDetails }: CourseCardProps) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const primaryColor = useColorModeValue(
    "brand.primary.700",
    "brand.primary.300"
  );

  return (
    <Card
      bg={cardBg}
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
        cursor: "pointer",
      }}
      onClick={() => onViewDetails && onViewDetails(course.id)}
    >
      <Box
        h="8px"
        bg={course.type === "LEC" ? "brand.primary.500" : "brand.secondary.500"}
      />
      <CardBody p={5}>
        <Flex direction="column" gap={4}>
          <Flex justify="space-between" align="start">
            <HStack spacing={2}>
              <Text fontWeight="bold" fontSize="lg" color={primaryColor}>
                {course.code}
              </Text>
              <Badge colorScheme={course.type === "LEC" ? "blue" : "teal"}>
                {course.type}
              </Badge>
            </HStack>
            <Text fontWeight="medium">{course.credits} Credits</Text>
          </Flex>

          <Text fontWeight="bold" fontSize="md" noOfLines={2}>
            {course.name}
          </Text>

          {course.lecturer && (
            <Text fontSize="sm" color="gray.500">
              Lecturer: {course.lecturer}
            </Text>
          )}

          {typeof course.progress === "number" && (
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">
                Progress: {course.progress}%
              </Text>
              <Progress
                value={course.progress}
                size="xs"
                width="100px"
                colorScheme={
                  course.progress > 75
                    ? "green"
                    : course.progress > 50
                      ? "blue"
                      : "orange"
                }
              />
            </HStack>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CourseCard;

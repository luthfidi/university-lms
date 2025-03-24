import {
  Box,
  Flex,
  Text,
  Badge,
  HStack,
  Progress,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { MdEvent, MdBook, MdAccessTime, MdLocationOn } from "react-icons/md";
import { getProgressColor } from "../utils/dashboardUtils";

/**
 * ClassCard Component
 * Displays information about an upcoming class
 */
export const ClassCard = ({ classItem }: { classItem: any }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <HStack
      bg={cardBg}
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      spacing={4}
      _hover={{ bg: hoverBg }}
    >
      <Flex
        bg={useColorModeValue("brand.primary.100", "brand.primary.900")}
        color={useColorModeValue("brand.primary.700", "brand.primary.200")}
        p={3}
        borderRadius="md"
        alignItems="center"
        justifyContent="center"
      >
        {classItem.deliveryMode === "F2F" ? (
          <MdEvent size={24} />
        ) : (
          <MdBook size={24} />
        )}
      </Flex>

      <Box flex={1}>
        <HStack justify="space-between">
          <Text fontWeight="bold">{classItem.courseCode}</Text>
          <Badge
            colorScheme={classItem.deliveryMode === "F2F" ? "green" : "blue"}
          >
            {classItem.deliveryMode}
          </Badge>
        </HStack>
        <Text>{classItem.courseName}</Text>
        <HStack fontSize="sm" color={textColor} spacing={4} mt={1}>
          <Text>
            <Icon as={MdAccessTime} mr={1} />
            {classItem.startTime} - {classItem.endTime}
          </Text>
          <Text>
            <Icon as={MdLocationOn} mr={1} />
            {classItem.room}
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
};

/**
 * ProgressCard Component
 * Displays progress for a course
 */
export const ProgressCard = ({ course }: { course: any }) => {
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box>
      <HStack justify="space-between" mb={1}>
        <Text fontWeight="bold">{course.name}</Text>
        <Text color={textColor} fontSize="sm">
          {course.tasks.completed}/{course.tasks.total} tasks
        </Text>
      </HStack>
      <Progress
        value={course.progress}
        size="sm"
        colorScheme={getProgressColor(course.progress)}
        borderRadius="full"
        hasStripe
      />
    </Box>
  );
};

/**
 * AnnouncementCard Component
 * Displays announcement information
 */
export const AnnouncementCard = ({
  announcement,
  formatDate,
}: {
  announcement: any;
  formatDate: (date: string) => string;
}) => {
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box>
      <Text fontWeight="bold">{announcement.title}</Text>
      <Text fontSize="sm" color={textColor} mb={1}>
        {formatDate(announcement.date)}
      </Text>
      <Text noOfLines={2} fontSize="sm">
        {announcement.content}
      </Text>
    </Box>
  );
};

/**
 * TodoItem Component
 * Displays a to-do list item
 */
export const TodoItem = ({
  todo,
  onToggle,
}: {
  todo: { id: string; text: string; completed: boolean };
  onToggle?: (id: string) => void;
}) => {
  return (
    <HStack>
      <Icon
        as={todo.completed ? CheckCircleIcon : WarningIcon}
        color={todo.completed ? "green.500" : "orange.500"}
        cursor={onToggle ? "pointer" : undefined}
        onClick={() => onToggle && onToggle(todo.id)}
      />
      <Text
        fontSize="sm"
        textDecoration={todo.completed ? "line-through" : undefined}
        color={todo.completed ? "gray.500" : undefined}
      >
        {todo.text}
      </Text>
    </HStack>
  );
};
